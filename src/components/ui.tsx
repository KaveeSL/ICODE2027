import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { publicAsset } from '../publicAsset'

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.18em] ${
        light ? 'text-white/70' : 'text-black/40'
      }`}
    >
      {children}
    </p>
  )
}

export function SerifAccent({ children }: { children: ReactNode }) {
  return (
    <span className="font-serif italic font-normal tracking-normal">{children}</span>
  )
}

type ButtonVariant = 'lime' | 'white' | 'glass' | 'dark' | 'ghost'

const buttonStyles: Record<ButtonVariant, string> = {
  lime: 'bg-lime text-black/90 font-semibold shadow-[inset_0_1px_0_rgb(255_255_255_/_0.16)] hover:bg-lime-deep',
  white: 'bg-white text-black font-medium hover:bg-neutral-100 border-0 shadow-none',
  glass:
    'bg-white/10 text-white border border-white/15 backdrop-blur-md hover:bg-white/15 font-medium',
  dark: 'bg-black text-white font-semibold hover:bg-neutral-900',
  ghost: 'bg-transparent text-black border border-black/10 hover:bg-surface font-medium',
}

export function Button({
  children,
  to,
  href,
  variant = 'lime',
  className = '',
  onClick,
  type = 'button',
}: {
  children: ReactNode
  to?: string
  href?: string
  variant?: ButtonVariant
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const classes = `relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm outline-none transition-all duration-150 active:scale-[0.97] ${buttonStyles[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  scale = false,
  y = 32,
}: {
  children: ReactNode
  className?: string
  delay?: number
  scale?: boolean
  y?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: scale ? 0.94 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function IconBubble({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lime/90 text-black shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25)] ${className}`}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  light?: boolean
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-3 text-[2rem] font-medium tracking-[-0.02em] text-balance leading-[1.08] sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-sm leading-relaxed tracking-tight md:text-base ${
            light ? 'text-white/70' : 'text-black/55'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function SoftCard({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      className={`rounded-2xl bg-surface px-5 py-5 transition-colors duration-200 hover:bg-surface-2 sm:px-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function FaqItem({
  question,
  children,
}: {
  question: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal y={20}>
      <div className="rounded-2xl bg-[#F5F5F7] px-5 transition-colors hover:bg-[#EEEEF0] sm:px-6">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-[15px] font-medium tracking-tight text-black sm:text-base">
            {question}
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-black/40 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden text-sm leading-relaxed text-black/55 sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function TextLink({
  to,
  href,
  children,
  className = '',
}: {
  to?: string
  href?: string
  children: ReactNode
  className?: string
}) {
  const classes = `inline-flex items-center gap-1.5 text-sm font-medium tracking-tight text-black transition-opacity hover:opacity-60 ${className}`
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={classes} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  actions?: ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden">
      <motion.div
        className="absolute inset-0 overflow-hidden bg-[#050505]"
        initial={reduce ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        {reduce ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${publicAsset('/images/hero-bg.jpg')}')` }}
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={publicAsset('/images/hero-bg.jpg')}
            preload="auto"
          >
            <source src={publicAsset('/videos/hero-hall-loop.mp4')} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/55" />
      <div className="relative mx-auto flex min-h-[70svh] max-w-5xl flex-col items-center justify-center px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-xl flex-col items-center"
        >
          <span className="mb-4 inline-flex max-w-full items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md sm:text-xs">
            <span className="truncate">{eyebrow}</span>
          </span>
          <h1 className="max-w-2xl text-[1.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-xs leading-relaxed tracking-tight text-white/75 sm:text-sm md:text-base">
            {description}
          </p>
          {actions ? (
            <div className="mt-6 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center [&_a]:w-full sm:[&_a]:w-auto [&_button]:w-full sm:[&_button]:w-auto">
              {actions}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
