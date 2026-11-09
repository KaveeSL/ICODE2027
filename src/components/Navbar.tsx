import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, pageLinks, site } from '../data/site'
import { BrandMark } from './BrandMark'
import { HostLogos } from './HostLogos'
import { Button } from './ui'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  const desktopShell = !solid
    ? 'w-[95vw] border border-transparent bg-transparent px-5 shadow-none backdrop-blur-0'
    : 'w-[min(1120px,94vw)] border border-white/10 bg-black/90 px-5 shadow-[0_20px_60px_rgb(0_0_0_/_0.35)] backdrop-blur-xl'

  const mobileShell = !solid
    ? 'border border-transparent bg-transparent shadow-none backdrop-blur-0'
    : 'border border-white/10 bg-black/90 shadow-[0_16px_40px_rgb(0_0_0_/_0.3)]'

  const linkClass =
    'rounded-full px-3.5 py-2 text-sm font-medium text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white'

  return (
    <>
      <div
        className={`hidden lg:flex fixed top-3 inset-x-0 z-50 mx-auto items-center justify-between gap-4 rounded-full p-3.5 transition-all duration-500 ease-out ${desktopShell}`}
      >
        <div className="flex min-w-0 items-center gap-3.5">
          <HostLogos variant="nav" />
          <span className="h-6 w-px shrink-0 bg-white/15" aria-hidden />
          <BrandMark size="md" light />
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`${linkClass} ${link.label === 'Important Dates' ? 'hidden xl:inline-flex' : ''} ${link.label === 'Schedule' ? 'hidden min-[1180px]:inline-flex' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/registration" className={`${linkClass} hidden lg:inline-flex`}>
            Registration
          </Link>
          <Button to={site.submitUrl} variant="lime" className="ml-2 !px-3 !py-2 text-sm font-semibold xl:!px-4">
            Submit Abstract
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-3 inset-x-0 z-50 mx-auto flex w-[min(95vw,100%-1rem)] max-w-full items-center justify-between gap-1.5 rounded-full px-2.5 py-2 transition-all duration-500 ease-out sm:gap-2 sm:px-3 ${mobileShell}`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-visible sm:gap-2">
          <HostLogos variant="nav" className="shrink-0 [&_img]:!h-6 sm:[&_img]:!h-7" />
          <span className="hidden h-5 w-px shrink-0 bg-white/15 min-[360px]:block" aria-hidden />
          <BrandMark size="sm" light className="min-w-0 shrink" />
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button to={site.submitUrl} variant="lime" className="!px-2.5 !py-1.5 text-[11px] font-semibold sm:!px-3 sm:text-xs">
            Submit
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 active:scale-95"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="mx-auto flex h-full w-full max-w-lg flex-col overflow-hidden px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[6.5rem] sm:px-10 sm:pb-10 sm:pt-28">
              <div className="flex min-h-0 flex-1 flex-col justify-center gap-0.5">
                {[...navLinks, ...pageLinks].map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.to}
                      className="block rounded-2xl px-3 py-2 text-[1.15rem] font-medium tracking-tight text-white transition hover:bg-white/5 sm:px-5 sm:py-3 sm:text-2xl"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-4 flex shrink-0 flex-col gap-2.5 px-1 sm:mt-6 sm:gap-3"
              >
                <Button to={site.submitUrl} variant="lime" className="w-full py-3 text-base sm:py-3.5">
                  Submit Abstract
                </Button>
                <a
                  href={site.previousConferenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-lime/40 bg-lime/15 px-3 py-2.5 text-center text-xs font-semibold text-lime transition-colors hover:bg-lime/25 sm:px-4 sm:py-3 sm:text-sm"
                >
                  {site.legacyConferenceCta}
                  <span aria-hidden>↗</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
