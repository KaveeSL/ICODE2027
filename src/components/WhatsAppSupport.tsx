import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site'
import { WhatsAppIcon } from './WhatsAppIcon'

const MESSAGE = 'Need help? Chat with us.'

function TypingDots() {
  return (
    <div className="flex items-center gap-0.5 py-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1 w-1 rounded-full bg-black/35"
          animate={{ y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 0.85,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.14,
          }}
        />
      ))}
    </div>
  )
}

export function WhatsAppSupport() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(true)
  const [phase, setPhase] = useState<'typing' | 'message'>('typing')
  const [typed, setTyped] = useState('')

  // Live loop: 3 dots → typewriter → pause → repeat
  useEffect(() => {
    if (!open) return

    if (reduce) {
      setPhase('message')
      setTyped(MESSAGE)
      return
    }

    let cancelled = false
    const timers: number[] = []

    const runCycle = () => {
      if (cancelled) return
      setPhase('typing')
      setTyped('')

      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          setPhase('message')
          let i = 0
          const typeNext = () => {
            if (cancelled) return
            i += 1
            setTyped(MESSAGE.slice(0, i))
            if (i < MESSAGE.length) {
              timers.push(window.setTimeout(typeNext, 30 + Math.random() * 28))
            } else {
              timers.push(window.setTimeout(runCycle, 4800))
            }
          }
          typeNext()
        }, 1200),
      )
    }

    timers.push(window.setTimeout(runCycle, 350))

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [open, reduce])

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:flex-row sm:items-end sm:gap-2.5">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[168px] rounded-xl bg-white px-2.5 py-2 shadow-[0_12px_32px_rgb(0_0_0_/_0.14)]"
          >
            <button
              type="button"
              className="absolute right-1 top-1 rounded-full p-0.5 text-black/35 transition hover:bg-surface hover:text-black/60"
              aria-label="Close support message"
              onClick={() => setOpen(false)}
            >
              <X className="h-3 w-3" />
            </button>

            <div className="flex items-center gap-1 pr-3.5">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                {!reduce ? (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-teal"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                ) : null}
                <span className="relative h-1.5 w-1.5 rounded-full bg-teal" />
              </span>
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-teal">
                {site.name} Support
              </p>
            </div>

            <div className="mt-1 min-h-[1rem] pr-3">
              <AnimatePresence mode="wait">
                {phase === 'typing' ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <TypingDots />
                  </motion.div>
                ) : (
                  <motion.p
                    key="message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] leading-snug text-black"
                  >
                    {typed}
                    {!reduce && typed.length < MESSAGE.length ? (
                      <motion.span
                        className="ml-px inline-block h-2.5 w-px translate-y-px bg-teal align-middle"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity }}
                      />
                    ) : null}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgb(37_211_102_/_0.4)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!reduce ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden
          />
        ) : null}
        <WhatsAppIcon className="relative z-[1] h-6 w-6" />
      </motion.a>
    </div>
  )
}
