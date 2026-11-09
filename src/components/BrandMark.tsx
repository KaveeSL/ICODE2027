import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

type BrandMarkProps = {
  to?: string
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  className?: string
}

const sizes = {
  sm: { word: 'text-lg tracking-[-0.7px]' },
  md: { word: 'text-[22px] tracking-[-0.9px]' },
  lg: { word: 'text-2xl tracking-[-0.9px]' },
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function BrandMark({
  to = '/#home',
  size = 'md',
  light = true,
  className = '',
}: BrandMarkProps) {
  const s = sizes[size]
  const location = useLocation()
  const navigate = useNavigate()

  // On a light navbar, use a deeper gold so it stays readable
  const accent = light ? 'text-lime' : 'text-[#B58F00]'

  const content = (
    <motion.span
      className={`group inline-flex max-w-full items-center overflow-visible ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <span
        className={`block max-w-full overflow-visible whitespace-nowrap leading-none font-medium ${s.word} ${light ? 'text-white' : 'text-black'}`}
      >
        ICODE
        {/* pr keeps italic “7” from clipping; Instrument Serif overhangs the box */}
        <span
          className={`inline-block overflow-visible pr-[0.28em] font-serif italic font-normal leading-none tracking-normal ${accent}`}
        >
          2027
        </span>
      </span>
    </motion.span>
  )

  if (!to) return content

  return (
    <Link
      to={to}
      className="inline-flex"
      aria-label="ICODE2027 home"
      onClick={(e) => {
        if (location.pathname === '/') {
          e.preventDefault()
          if (location.hash !== '#home') {
            navigate('/#home', { replace: true })
          }
          scrollToPageTop()
          return
        }
        sessionStorage.setItem('icode-scroll-home', '1')
      }}
    >
      {content}
    </Link>
  )
}
