import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { footerNav, pageLinks, site } from '../data/site'
import { BrandMark } from './BrandMark'
import { DottedBrandMark } from './DottedBrandMark'
import { HostLogos } from './HostLogos'
import { Button, SerifAccent } from './ui'
import { WhatsAppIcon } from './WhatsAppIcon'

export function Footer() {
  return (
    <div className="relative z-0">
      <footer className="relative overflow-hidden bg-[#101010] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.18]" aria-hidden>
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-teal/20 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full px-4 pt-8 sm:px-6 sm:pt-10 lg:px-12">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-9 text-center sm:rounded-[2rem] sm:px-10 sm:py-14">
            <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.16em] text-white/45 sm:text-[11px] sm:tracking-[0.22em]">
              Everything open education. In one conference.
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-[1.5rem] font-medium leading-[1.12] tracking-[-0.02em] text-balance sm:mt-5 sm:text-5xl sm:leading-[1.08]">
              Join the community shaping <SerifAccent>digital</SerifAccent> learning for{' '}
              <span className="inline-block pr-[0.22em] font-serif italic font-normal leading-none text-lime">
                2027
              </span>
              .
            </h2>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Button to="/call-for-papers" variant="lime" className="w-full !px-6 !py-3 sm:w-auto">
                Submit Abstract
              </Button>
              <Button to="/registration" variant="glass" className="w-full !px-6 !py-3 sm:w-auto">
                Registration
              </Button>
            </div>
          </div>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col justify-between gap-10 pb-8 sm:gap-12 sm:pb-10 lg:flex-row lg:gap-10">
              <div className="flex w-full max-w-full flex-col gap-4 lg:max-w-sm">
                <BrandMark size="lg" />
                <p className="text-sm leading-relaxed text-white/55">
                  {site.fullName}. Hybrid conference hosted by CODL at the University of Moratuwa.
                </p>
                <HostLogos variant="footer" />
                <div className="max-w-[calc(100%-11rem)] space-y-2.5 text-sm text-white/50 sm:max-w-none">
                  <a
                    href={`mailto:${site.email}`}
                    className="flex min-w-0 items-center gap-2 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-lime" />
                    <span className="break-all">{site.email}</span>
                  </a>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-lime" />
                    {site.phone}
                  </a>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    <span className="min-w-0 break-words leading-relaxed">
                      University of Moratuwa, Katubedda
                      <br />
                      {site.datesLabel}
                      <span className="text-white/30"> · </span>
                      {site.location}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 min-[480px]:grid-cols-2 md:grid-cols-3 lg:max-w-3xl lg:flex-1 lg:gap-12">
                <div className="min-w-0">
                  <h3 className="mb-4 text-sm font-medium tracking-[-0.3px] text-white sm:mb-5">
                    Explore
                  </h3>
                  <div className="flex flex-col gap-3 sm:gap-3.5">
                    {footerNav.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="group inline-flex max-w-full items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
                      >
                        <span className="min-w-0">{item.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="mb-4 text-sm font-medium tracking-[-0.3px] text-white sm:mb-5">
                    Pages
                  </h3>
                  <div className="flex flex-col gap-3 sm:gap-3.5">
                    {pageLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="group inline-flex max-w-full items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
                      >
                        <span className="min-w-0">{item.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 min-[480px]:col-span-2 md:col-span-1">
                  <h3 className="mb-4 text-sm font-medium tracking-[-0.3px] text-white sm:mb-5">
                    Quick links
                  </h3>
                  <div className="flex flex-col gap-3 sm:gap-3.5">
                    <a
                      href={site.universityUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex max-w-full items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      <span className="min-w-0">University of Moratuwa</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                    </a>
                    <a
                      href={site.bitUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex max-w-full items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      BIT Programme
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                    </a>
                    <Link
                      to="/governance"
                      className="group inline-flex max-w-full items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      Governance
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 py-6 pb-20 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
              <p className="max-w-full break-words leading-relaxed pr-20 sm:pr-0">
                ©{site.year} {site.organizer}. All Rights Reserved.
              </p>
              <a
                href={site.previousConferenceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit max-w-[calc(100%-5.5rem)] flex-wrap items-center gap-1 font-medium text-lime transition-colors hover:text-lime-deep sm:max-w-full"
              >
                {site.legacyConferenceCta}
                <ArrowUpRight className="h-3 w-3 shrink-0" />
              </a>
            </div>
          </div>

          <div className="mt-4 w-full overflow-hidden border-t border-white/10 sm:mt-5 lg:mt-9">
            <DottedBrandMark
              word="ICODE2027"
              className="relative mx-auto h-[56px] w-full max-w-full overflow-hidden sm:h-[130px] md:h-[180px] lg:h-[220px] xl:h-[250px]"
              options={{
                brandHue: 100,
                restColor: 'oklch(0.64 0.006 100)',
                glowLch: '0.62 0.18 110',
                sparkColor: '210,255,70',
                maxSize: 0.8,
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
