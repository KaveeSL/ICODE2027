import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  Building2,
  CalendarDays,
  Globe2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mail,
  MapPin,
  Presentation,
  Sparkles,
  Users,
} from 'lucide-react'
import {
  aboutCopy,
  audiences,
  faqs,
  importantDates,
  partners,
  programmeDays,
  site,
  whyParticipate,
} from '../data/site'
import { HostLogos } from '../components/HostLogos'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import {
  Button,
  FaqItem,
  IconBubble,
  Reveal,
  SectionHeading,
  SerifAccent,
  SoftCard,
  TextLink,
} from '../components/ui'
import { publicAsset } from '../publicAsset'

const whyIcons = [Presentation, Handshake, Lightbulb, Globe2, Sparkles, Users]
const audienceIcons = [GraduationCap, Users, Building2]

function Hero({ pinRef }: { pinRef: RefObject<HTMLDivElement | null> }) {
  const reduce = useReducedMotion()
  // Same curves as before, but on the scroll timeline so the phone does not
  // wait on a JavaScript listener. Older browsers keep the motion values.
  const [nativeScroll] = useState(
    () => typeof CSS !== 'undefined' && CSS.supports('animation-timeline', 'view()'),
  )
  if (!reduce && !nativeScroll) return <HeroJsScroll pinRef={pinRef} />
  return <HeroFrame nativeScroll={!reduce && nativeScroll} />
}

function HeroJsScroll({ pinRef }: { pinRef: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  })
  const bgScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.5])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, -110])
  return (
    <HeroFrame
      nativeScroll={false}
      bgScale={bgScale}
      copyOpacity={copyOpacity}
      copyY={copyY}
    />
  )
}

function HeroFrame({
  nativeScroll,
  bgScale,
  copyOpacity,
  copyY,
}: {
  nativeScroll: boolean
  bgScale?: MotionValue<number>
  copyOpacity?: MotionValue<number>
  copyY?: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  // Same loop, smaller decode on phones. Chosen once so scrolling never swaps the clip.
  const [heroVideo] = useState(() =>
    window.matchMedia('(max-width: 767px)').matches
      ? publicAsset('/videos/hero-hall-loop-mobile.mp4')
      : publicAsset('/videos/hero-hall-loop.mp4'),
  )
  const bgRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (nativeScroll || !bgScale || !copyOpacity || !copyY) return
    const apply = () => {
      const scale = bgScale.get()
      const opacity = copyOpacity.get()
      const y = copyY.get()
      if (bgRef.current) bgRef.current.style.transform = `scale(${scale})`
      if (copyRef.current) {
        copyRef.current.style.opacity = String(opacity)
        copyRef.current.style.transform = `translateY(${y}px)`
      }
    }
    apply()
    const stops = [bgScale.on('change', apply), copyOpacity.on('change', apply), copyY.on('change', apply)]
    return () => stops.forEach((stop) => stop())
  }, [nativeScroll, bgScale, copyOpacity, copyY])

  const background = (
    <>
      {reduce ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${publicAsset('/images/hero-bg.jpg')}')` }}
        />
      ) : (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={publicAsset('/images/hero-bg.jpg')}
          preload="metadata"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0_/_0.3)_100%)]" />
    </>
  )
  const bgClass = `pointer-events-none absolute inset-0 z-0 bg-[#050505] ${nativeScroll ? 'hero-bg-zoom' : ''}`

  return (
    <section className="sticky top-0 z-0 h-svh w-full touch-pan-y overflow-hidden">
      <div ref={bgRef} className={bgClass} aria-hidden>
        {background}
      </div>

      <div
        ref={copyRef}
        className={`absolute inset-x-0 top-[18svh] z-30 flex flex-col items-center px-5 text-center sm:top-[14svh] sm:px-6 ${nativeScroll ? 'hero-copy-scroll' : ''}`}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-xl flex-col items-center"
        >
          <motion.a
            href={site.previousConferenceUrl}
            target="_blank"
            rel="noreferrer"
            className="relative mb-3 mt-2 inline-flex max-w-full items-center gap-1.5 overflow-hidden rounded-full border border-lime/55 bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90 transition-colors hover:border-lime/75 hover:bg-white/20 sm:mb-4 sm:mt-4 sm:gap-2 sm:px-3.5 sm:text-xs"
            animate={
              reduce
                ? undefined
                : {
                    borderColor: [
                      'rgb(254 208 0 / 0.4)',
                      'rgb(254 208 0 / 0.85)',
                      'rgb(254 208 0 / 0.4)',
                    ],
                  }
            }
            transition={
              reduce
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {!reduce ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-120%', '320%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
              />
            ) : null}
            <span className="relative truncate">
              {site.legacyConferenceCta}
            </span>
            <motion.span
              aria-hidden
              className="relative shrink-0"
              animate={reduce ? undefined : { x: [0, 2, 0], y: [0, -2, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              ↗
            </motion.span>
          </motion.a>

          <h1 className="max-w-4xl overflow-visible text-[3.5rem] font-medium leading-[1.05] tracking-[-0.04em] text-white min-[400px]:text-[3.7rem] sm:text-6xl md:text-7xl lg:text-8xl">
            ICODE
            <span className="hero-year-live inline-block py-[0.06em] pr-[0.28em] font-serif italic font-normal leading-none tracking-normal text-lime">
              2027
            </span>
          </h1>

          <p className="hero-subtitle-live mx-auto mt-3 max-w-2xl text-[0.95rem] font-medium tracking-tight text-white sm:mt-4 sm:text-xl md:text-2xl">
            International Conference on Open and Digital Education
          </p>

          <p className="mx-auto mt-3 max-w-xl text-xs font-normal leading-relaxed tracking-tight text-white/75 sm:text-sm md:text-base">
            The conference that actually <SerifAccent>connects</SerifAccent> research and practice.
            Proudly hosted by the Centre for Open and Distance Learning (CODL), University of
            Moratuwa. Hybrid event in Colombo, {site.datesLabel}.
          </p>

          <div className="mt-5 flex w-full max-w-[340px] flex-col gap-3 sm:max-w-[440px]">
            <div className="rounded-[1.35rem] border border-white/25 bg-black/70 px-4 py-3.5 text-center text-sm text-white shadow-[0_8px_32px_rgb(0_0_0_/_0.35)] sm:px-5 sm:py-4 sm:text-base">
              <span className="font-medium whitespace-nowrap">{site.datesLabel}</span>
              <span className="text-white/45"> · </span>
              <span className="text-white/85 whitespace-nowrap">Hybrid · Colombo</span>
            </div>
            <Button
              to="/call-for-papers"
              variant="lime"
              className="w-full sm:py-3.5 sm:text-base"
            >
              Submit Abstract
            </Button>
            <Button
              to="/registration"
              variant="glass"
              className="w-full !bg-white/12 !backdrop-blur-none sm:py-3.5 sm:text-base"
            >
              View Registration
            </Button>
            <Button
              to="/programme"
              variant="glass"
              className="w-full !bg-white/12 !backdrop-blur-none sm:py-3.5 sm:text-base"
            >
              View 2-Day Schedule
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  )
}

export function HomePage() {
  const pinRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Ceynk pin: tall wrapper so sticky hero can zoom/fade while scrolling */}
      <div id="home" ref={pinRef} className="hero-pin relative h-[220svh] lg:h-[250svh]">
        <Hero pinRef={pinRef} />
      </div>

      <div
        id="content-sheet"
        className="relative z-10 mt-[-100svh] rounded-t-[1.75rem] bg-white sm:rounded-t-[2.75rem] lg:rounded-t-[4rem]"
      >
        <section id="about" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/40">
                    About
                  </p>
                  <h2 className="mt-3 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-balance sm:text-4xl lg:text-5xl">
                    Designing the next generation of <SerifAccent>open</SerifAccent> and{' '}
                    <SerifAccent>digital</SerifAccent> education.
                  </h2>
                </div>
                <p className="text-sm leading-relaxed tracking-tight text-black/55 md:text-base lg:pb-1">
                  {aboutCopy.lead}
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-3 lg:grid-cols-2">
              <Reveal delay={0.05}>
                <SoftCard className="h-full">
                  <p className="text-sm leading-relaxed text-black/55 sm:text-base">{aboutCopy.body}</p>
                </SoftCard>
              </Reveal>
              <Reveal delay={0.1}>
                <SoftCard className="h-full">
                  <p className="text-sm leading-relaxed text-black/55 sm:text-base">
                    {aboutCopy.global}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Research', 'Policy', 'Practice'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SoftCard>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-col gap-4 border-t border-black/5 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-black/40">
                    Host institutions
                  </p>
                  <HostLogos variant="about" />
                </div>
                <a
                  href={site.previousConferenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-lime/40 bg-lime px-3.5 py-1.5 text-xs font-semibold text-black shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2)] transition-colors hover:bg-lime-deep sm:ml-auto sm:w-auto"
                >
                  {site.legacyConferenceCta}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="w-full overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                eyebrow="Programme"
                title={
                  <>
                    A two-day <SerifAccent>integrated</SerifAccent>{' '}
                    <SerifAccent>programme</SerifAccent>
                  </>
                }
                description="From peer-reviewed research to hands-on workshops — each day builds on the last."
              />
            </Reveal>
            <div className="mt-12 grid gap-3 lg:grid-cols-2">
              {programmeDays.map((day, i) => (
                <Reveal key={day.slug} delay={i * 0.08}>
                  <SoftCard className="flex h-full flex-col">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-teal">
                      {day.day} · {day.date}
                    </p>
                    <h3 className="mt-3 text-xl font-medium tracking-tight">{day.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-black/55">{day.summary}</p>
                    <ul className="mt-5 space-y-2 text-sm text-black/80">
                      {day.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <TextLink to={`/programme#${day.slug}`}>View schedule →</TextLink>
                    </div>
                  </SoftCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-4 py-20 sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="Why participate"
                title={
                  <>
                    Join a focused <SerifAccent>community</SerifAccent> at the intersection of{' '}
                    <SerifAccent>research and practice</SerifAccent>.
                  </>
                }
                description="Practical insights you can apply immediately — from learning analytics and AI support tools to sustainable Open and Digital Education models."
              />
            </Reveal>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {whyParticipate.map((item, i) => {
                const Icon = whyIcons[i] ?? Sparkles
                return (
                  <Reveal key={item} delay={i * 0.06} scale>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                      className="h-full rounded-[1.5rem] bg-surface p-5 transition-colors hover:bg-surface-2 sm:p-6"
                    >
                      <IconBubble>
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </IconBubble>
                      <p className="mt-4 text-[15px] font-medium leading-snug tracking-tight text-black">
                        {item}
                      </p>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.12}>
              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {audiences.map((item, i) => {
                  const Icon = audienceIcons[i] ?? Users
                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ y: -3 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                      className="rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-[0_1px_0_rgb(0_0_0_/_0.03)] sm:p-6"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-lime">
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <div>
                          <h3 className="text-base font-medium tracking-tight">
                            {item.title.slice(0, item.title.lastIndexOf(' '))}{' '}
                            <SerifAccent>{item.title.slice(item.title.lastIndexOf(' ') + 1)}</SerifAccent>
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-black/55">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="dates"
          className="relative z-[1] scroll-mt-24 overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                light
                eyebrow="Important Dates"
                title={
                  <>
                    Mark your calendar for <SerifAccent>ICODE2027</SerifAccent>
                  </>
                }
                description="A quick overview for prospective authors, participants, and partners."
              />
            </Reveal>
            <div className="mt-12 space-y-3">
              {importantDates.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime/90 text-black">
                        <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-sm font-medium tracking-tight">{item.label}</p>
                        <p className="mt-1 text-sm text-white/55">{item.note}</p>
                      </div>
                    </div>
                    <span className="inline-flex w-fit rounded-full bg-lime px-4 py-1.5 text-sm font-semibold text-black">
                      {item.date}
                    </span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                eyebrow="Partners"
                title={
                  <>
                    Grateful for the institutions supporting <SerifAccent>ICODE</SerifAccent>
                  </>
                }
              />
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {partners.map((partner, i) => (
                <Reveal key={partner.id} delay={i * 0.05}>
                  <div className="h-28 rounded-2xl bg-surface" aria-hidden />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="Frequently Asked Questions"
                title={
                  <>
                    Everything you need to <SerifAccent>know</SerifAccent>
                  </>
                }
                description="Clear answers about format, submissions, venues, and participation."
              />
            </Reveal>
            <div className="mt-10 space-y-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.id} question={faq.question}>
                  {Array.isArray(faq.answer) ? (
                    <ul className="list-disc space-y-1 pl-5">
                      {faq.answer.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </FaqItem>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-surface px-4 py-20 sm:px-6 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="Contact"
                title={
                  <>
                    Talk to the <SerifAccent>secretariat</SerifAccent>
                  </>
                }
                description="For questions about submissions, registration, or logistics, the Conference Secretariat is your primary point of contact."
              />
            </Reveal>

            <div className="mt-12 grid gap-3 md:grid-cols-3">
              <Reveal delay={0.04} scale>
                <motion.a
                  href={`mailto:${site.email}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="block h-full rounded-[1.5rem] bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_rgb(0_0_0_/_0.06)]"
                >
                  <IconBubble>
                    <Mail className="h-5 w-5" strokeWidth={1.8} />
                  </IconBubble>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-black/40">
                    Email
                  </p>
                  <p className="mt-2 break-all text-base font-medium tracking-tight text-black sm:text-lg">
                    {site.email}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-black/50">
                    Preferred channel. We aim to respond within 2–3 working days.
                  </p>
                </motion.a>
              </Reveal>

              <Reveal delay={0.1} scale>
                <motion.a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="block h-full rounded-[1.5rem] bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_rgb(0_0_0_/_0.06)]"
                >
                  <IconBubble className="!bg-[#25D366] !text-white">
                    <WhatsAppIcon className="h-5 w-5" />
                  </IconBubble>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-black/40">
                    WhatsApp
                  </p>
                  <p className="mt-2 text-base font-medium tracking-tight text-black sm:text-lg">
                    {site.phone}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-black/50">
                    Chat with the ICODE2027 support team for quick help.
                  </p>
                </motion.a>
              </Reveal>

              <Reveal delay={0.16} scale>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="h-full rounded-[1.5rem] bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_rgb(0_0_0_/_0.06)]"
                >
                  <IconBubble>
                    <MapPin className="h-5 w-5" strokeWidth={1.8} />
                  </IconBubble>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-black/40">
                    Venue
                  </p>
                  <p className="mt-2 text-lg font-medium tracking-tight text-black">
                    University of Moratuwa, Katubedda
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-black/50">
                    Both days at University of Moratuwa
                  </p>
                </motion.div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white sm:rounded-[2rem]">
                <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime/90 text-black">
                      <MapPin className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium tracking-tight text-black">
                        University of Moratuwa, Katubedda
                      </p>
                      <p className="mt-0.5 text-xs text-black/50 sm:text-sm">
                        {site.datesLabel} · Hybrid · Colombo
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=University+of+Moratuwa,+Katubedda"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium tracking-tight text-black transition-opacity hover:opacity-60"
                  >
                    Get directions →
                  </a>
                </div>
                <iframe
                  title="University of Moratuwa location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.7920910557937!2d79.89829207553322!3d6.795132919946063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245416b7f34b5%3A0x7bd32721ab02560e!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1773647678993!5m2!1sen!2slk"
                  className="h-[280px] w-full border-0 sm:h-[360px] md:h-[400px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}
