import { useEffect, useRef } from 'react'

type Row = {
  word: string
  letterTrack?: number
  fillFrac?: number
}

type Options = {
  word?: string
  restColor?: string
  brandHue?: number
  glowLch?: string
  sparkColor?: string
  maxSize?: number
  speed?: number
}

type DottedBrandMarkProps = {
  word?: string
  className?: string
  options?: Options
}

const TAU = Math.PI * 2

function fontFor(size: number) {
  return `800 ${size}px "Inter Tight", ui-sans-serif, system-ui, -apple-system, sans-serif`
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function smoothstep(t: number, a: number, b: number) {
  const x = clamp((t - a) / (b - a), 0, 1)
  return x * x * (3 - 2 * x)
}

function hash(x: number, y: number) {
  const n = 43758.5453 * Math.sin(127.1 * x + 311.7 * y)
  return n - Math.floor(n)
}

/** Ceynk-style dotted wordmark with pointer glow + shimmer. */
class DottedWordCanvas {
  host: HTMLElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  reduced: boolean
  rows: Row[]
  restColor: string
  brandHue: number
  glowLch: string
  sparkColor: string
  maxSize: number
  speed: number
  resizeObserver: ResizeObserver | null = null
  dpr = 1
  viewW = 0
  viewH = 0
  cell = 10
  time = 0
  n = 0
  px = new Float32Array(0)
  py = new Float32Array(0)
  spark = new Uint8Array(0)
  lit = new Float32Array(0)
  seed = new Float32Array(0)
  hueSeed = new Float32Array(0)
  hasPointer = false
  rawX = 0
  rawY = 0
  lightX = 0
  lightY = 0
  lightSpeed = 0
  raf = 0
  stepL = new Float32Array(24)
  stepC = new Float32Array(24)

  constructor(host: HTMLElement, options: Options = {}) {
    this.host = host
    this.restColor = options.restColor ?? 'oklch(0.64 0.006 100)'
    this.brandHue = options.brandHue ?? 100
    this.glowLch = options.glowLch ?? '0.55 0.16 110'
    this.sparkColor = options.sparkColor ?? '200, 255, 80'
    this.maxSize = options.maxSize ?? 0.9
    this.speed = options.speed ?? 0.02
    this.rows = [{ word: options.word ?? 'ICODE2027', letterTrack: -0.02, fillFrac: 0.96 }]

    this.canvas = document.createElement('canvas')
    this.canvas.className = 'pointer-events-none absolute inset-0 block h-full w-full'
    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('2d context unavailable')
    this.ctx = ctx
    this.host.appendChild(this.canvas)

    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.resize()

    window.addEventListener('pointermove', this.onMove, { passive: true })
    window.addEventListener('pointerleave', this.onLeave)
    window.addEventListener('pointerup', this.onLeave, { passive: true })
    window.addEventListener('pointercancel', this.onLeave, { passive: true })

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resize())
      this.resizeObserver.observe(this.host)
    }

    document.fonts?.ready.then(() => this.resize()).catch(() => {})
  }

  resize() {
    const rect = this.host.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    this.viewW = rect.width
    this.viewH = rect.height
    this.dpr = Math.min(2, window.devicePixelRatio || 1)
    this.cell = Math.max(2, Math.round(this.viewW / 440))

    const { cell, viewW, viewH } = this
    this.canvas.style.width = `${Math.round(viewW)}px`
    this.canvas.style.height = `${Math.round(viewH)}px`
    this.canvas.width = Math.ceil(viewW * this.dpr)
    this.canvas.height = Math.ceil(viewH * this.dpr)
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.ctx.imageSmoothingEnabled = false

    const xs: number[] = []
    const ys: number[] = []
    const sparks: number[] = []
    const seeds: number[] = []
    const hues: number[] = []

    this.rows.forEach((row) => {
      const off = document.createElement('canvas')
      off.width = Math.max(1, Math.floor(viewW))
      off.height = Math.max(1, Math.floor(viewH))
      const octx = off.getContext('2d')
      if (!octx) return

      octx.fillStyle = '#000'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'

      let size = 0.9 * viewH
      const track = row.letterTrack ?? -0.02
      const fillFrac = row.fillFrac ?? 0.96
      try {
        ;(octx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          `${track * size}px`
      } catch {
        /* ignore */
      }
      octx.font = fontFor(size)
      const measured = octx.measureText(row.word).width || 1
      size *= (viewW * fillFrac) / measured
      try {
        ;(octx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          `${track * size}px`
      } catch {
        /* ignore */
      }
      octx.font = fontFor(size)
      octx.fillText(row.word, viewW / 2, viewH / 2)

      const data = octx.getImageData(0, 0, off.width, off.height).data
      const cols = Math.ceil(viewW / cell)
      const rows = Math.ceil(viewH / cell)

      for (let ry = 0; ry < rows; ry++) {
        for (let cx = 0; cx < cols; cx++) {
          const px = Math.floor(cx * cell + cell / 2)
          const py = Math.floor(ry * cell + cell / 2)
          if (px >= off.width || py >= off.height) continue
          const alpha = (data[(py * off.width + px) * 4 + 3] ?? 0) / 255
          if (alpha <= 0.35) continue
          xs.push(px)
          ys.push(py)
          sparks.push(hash(px + 7, py - 3) > 0.82 ? 1 : 0)
          seeds.push(hash(1.3 * px, 0.7 * py))
          hues.push(hash(0.7 * px + 11, 1.9 * py - 5))
        }
      }
    })

    this.n = xs.length
    this.px = new Float32Array(xs)
    this.py = new Float32Array(ys)
    this.spark = new Uint8Array(sparks)
    this.seed = new Float32Array(seeds)
    this.hueSeed = new Float32Array(hues)
    this.lit = new Float32Array(this.n)

    if (this.reduced && !this.raf) this.renderStatic()
  }

  distSegSq(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
    const dx = bx - ax
    const dy = by - ay
    if (dx === 0 && dy === 0) {
      const ex = px - ax
      const ey = py - ay
      return ex * ex + ey * ey
    }
    const t = clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1)
    const qx = px - (ax + dx * t)
    const qy = py - (ay + dy * t)
    return qx * qx + qy * qy
  }

  frame = (now: number) => {
    const { ctx, viewW, viewH, cell, n, px, py, hueSeed, spark, lit, seed } = this
    if ((!viewW || !viewH || !n) && (this.resize(), !this.n)) {
      this.raf = requestAnimationFrame(this.frame)
      return
    }

    ctx.clearRect(0, 0, viewW, viewH)
    this.time += this.speed
    const T = this.time

    const prevX = this.lightX
    const prevY = this.lightY
    if (this.hasPointer) {
      this.lightX += (this.rawX - this.lightX) * 0.5
      this.lightY += (this.rawY - this.lightY) * 0.5
    }
    const lx = this.lightX
    const ly = this.lightY
    this.lightSpeed = 0.9 * this.lightSpeed + 0.1 * Math.hypot(lx - prevX, ly - prevY)

    const radius = clamp(0.22 * viewH + 0.9 * this.lightSpeed, 0.18 * viewH, 0.42 * viewH)
    const reach = 1.5 * radius
    const reachSq = reach * reach
    const minX = Math.min(prevX, lx) - reach
    const maxX = Math.max(prevX, lx) + reach
    const minY = Math.min(prevY, ly) - reach
    const maxY = Math.max(prevY, ly) + reach

    const base = new Path2D()
    const glowBuckets = Array.from({ length: 24 }, () =>
      Array.from({ length: 6 }, () => new Path2D()),
    )
    const hueAt = new Float32Array(24)
    const active: number[] = []

    for (let i = 0; i < n; i++) {
      const x = px[i]
      const y = py[i]
      let heat = 0

      if (this.hasPointer && x >= minX && x <= maxX && y >= minY && y <= maxY) {
        const d = this.distSegSq(x, y, prevX, prevY, lx, ly)
        if (d <= reachSq) {
          const ang = Math.atan2(y - ly, x - lx)
          const rim =
            1 +
            0.3 * Math.sin(3 * ang + 1.6 * T) +
            0.16 * Math.sin(5 * ang - 1.1 * T + 1.3)
          const raw = clamp(1 - Math.sqrt(d) / (radius * rim), 0, 1)
          heat = raw * raw * (3 - 2 * raw)
        }
      }

      const ease = heat > lit[i] ? 0.24 : 0.02
      lit[i] += (heat - lit[i]) * ease

      const nx = x / Math.max(viewW, 1)
      const ny = y / Math.max(viewH, 1)
      const wave =
        Math.sin((1.6 * nx + 0.4 * Math.sin(0.3 * T)) * TAU + 0.8 * T) +
        0.7 * Math.sin((2.1 * ny - 0.9 * nx) * TAU - 0.6 * T + 1.7) +
        0.5 * Math.sin((3.3 * nx + 2.7 * ny) * TAU + 0.4 * T + 4.2) +
        0.4 * Math.cos((1.3 * ny - 1.1 * Math.sin(0.2 * T)) * TAU - 0.5 * T)

      let energy = smoothstep(wave, 0.1, 1.6)
      energy = Math.max(energy, lit[i])

      const baseScale = 0.22 + 0.1 * (0.5 + 0.5 * Math.sin(seed[i] * TAU + 1.3 * T))
      const size = cell * (baseScale + (this.maxSize - baseScale) * energy)
      const half = size / 2
      base.rect(x - half, y - half, size, size)

      if (energy > 0.04) {
        const hue =
          (this.brandHue + (wave - 0.8) * 16 + (hueSeed[i] - 0.5) * 8 + 360) % 360
        const bucket = (Math.round((hue / 360) * 24) % 24 + 24) % 24
        hueAt[bucket] = hue
        const step = Math.min(5, Math.floor(6 * energy))
        glowBuckets[bucket][step].rect(x - half, y - half, size, size)
        this.stepL[bucket] = 0.55
        this.stepC[bucket] = 0.12
      }

      if (lit[i] > 0.02) active.push(i)
    }

    ctx.fillStyle = this.restColor
    ctx.fill(base)

    for (let b = 0; b < 24; b++) {
      const hue = hueAt[b]
      for (let s = 0; s < 6; s++) {
        ctx.globalAlpha = (s + 1) / 6
        ctx.fillStyle = `oklch(${this.stepL[b]} ${this.stepC[b]} ${hue})`
        ctx.fill(glowBuckets[b][s])
      }
    }
    ctx.globalAlpha = 1

    for (const i of active) {
      const heat = lit[i]
      const x = px[i]
      const y = py[i]
      const size = cell * (0.7 + (this.maxSize - 0.7) * heat)
      const half = size / 2

      if (spark[i]) {
        const a = seed[i]
        const drift = 0.000025 * now
        const amp = (0.45 + a) * cell * 0.28
        const sx = x + Math.sin(0.05 * x + 1.3 * drift + a * TAU) * amp
        const sy = y + Math.cos(0.04 * y - 0.9 * drift + a * TAU) * amp
        ctx.fillStyle = `rgba(${this.sparkColor},${(0.1 * heat).toFixed(3)})`
        ctx.fillRect(sx - 1.5 * half, sy - 1.5 * half, 1.5 * size, 1.5 * size)
        ctx.fillStyle = `rgba(${this.sparkColor},${(0.55 * heat).toFixed(3)})`
        ctx.fillRect(sx - half, sy - half, size, size)
      } else {
        ctx.fillStyle = `oklch(${this.glowLch} / ${(0.85 * heat).toFixed(3)})`
        ctx.fillRect(x - half, y - half, size, size)
      }
    }

    this.raf = requestAnimationFrame(this.frame)
  }

  renderStatic() {
    const { ctx, viewW, viewH, n, px, py, cell } = this
    ctx.clearRect(0, 0, viewW, viewH)
    const path = new Path2D()
    const size = 0.5 * cell
    const half = size / 2
    for (let i = 0; i < n; i++) path.rect(px[i] - half, py[i] - half, size, size)
    ctx.fillStyle = this.restColor
    ctx.fill(path)
  }

  onMove = (e: PointerEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (x >= -40 && y >= -40 && x <= rect.width + 40 && y <= rect.height + 40) {
      if (!this.hasPointer) {
        this.hasPointer = true
        this.lightX = x
        this.lightY = y
        this.lightSpeed = 0
      }
      this.rawX = x
      this.rawY = y
    } else {
      this.hasPointer = false
    }
  }

  onLeave = () => {
    this.hasPointer = false
  }

  start() {
    if (!this.reduced && !this.raf) this.raf = requestAnimationFrame(this.frame)
  }

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
  }

  destroy() {
    this.stop()
    window.removeEventListener('pointermove', this.onMove)
    window.removeEventListener('pointerleave', this.onLeave)
    window.removeEventListener('pointerup', this.onLeave)
    window.removeEventListener('pointercancel', this.onLeave)
    this.resizeObserver?.disconnect()
    this.canvas.remove()
  }
}

export function DottedBrandMark({
  word = 'ICODE2027',
  className = '',
  options,
}: DottedBrandMarkProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const engine = new DottedWordCanvas(host, { word, ...options })
    let observer: IntersectionObserver | null = null

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) engine.start()
            else engine.stop()
          }
        },
        { rootMargin: '200px' },
      )
      observer.observe(host)
    } else {
      engine.start()
    }

    return () => {
      observer?.disconnect()
      engine.destroy()
    }
    // options are static brand config from call sites
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word])

  return (
    <div
      ref={hostRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      aria-hidden
    />
  )
}
