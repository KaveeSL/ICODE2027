import { programmeDays } from '../data/site'
import { Button, PageHero, Reveal, SerifAccent, SoftCard, TextLink } from '../components/ui'

export function ProgrammePage() {
  return (
    <>
      <PageHero
        eyebrow="Conference Programme"
        title={
          <>
            Two connected days of <em className="font-serif italic">research and practice</em>
          </>
        }
        description="Browse the ICODE2027 schedule across the Academic Research Conference and Practice & Innovation Workshops."
        actions={
          <>
            <Button to="/call-for-papers" variant="lime">
              Submit Abstract
            </Button>
            <Button to="/registration" variant="glass">
              Registration
            </Button>
          </>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-6">
          {programmeDays.map((day, i) => (
            <Reveal key={day.slug} delay={i * 0.05}>
              <SoftCard id={day.slug} className="scroll-mt-28 bg-white hover:bg-white sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
                      {day.day} · {day.date}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                      <SerifAccent>{day.title}</SerifAccent>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {day.summary}
                    </p>
                    <p className="mt-3 text-sm font-medium text-ink">{day.venue}</p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {day.points.map((point) => (
                        <li key={point} className="rounded-2xl bg-surface px-4 py-3 text-sm">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shrink-0">
                    <TextLink to="/proceedings">Browse proceedings</TextLink>
                  </div>
                </div>
              </SoftCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
