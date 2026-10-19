import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppSupport } from './WhatsAppSupport'

function scrollToHash(hash: string) {
  if (!hash || hash === '#home' || hash === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    return
  }
  window.scrollTo({ top: 0 })
}

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    const forceHome = sessionStorage.getItem('icode-scroll-home')
    if (forceHome) {
      sessionStorage.removeItem('icode-scroll-home')
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 40)
      return
    }

    if (location.hash) {
      scrollToHash(location.hash)
      return
    }

    window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* z-10 so page content covers the footer scrub (Ceynk-style, prevents overlap) */}
      <main className="relative z-10 bg-white">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppSupport />
    </div>
  )
}
