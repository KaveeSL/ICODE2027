import { themes } from '../data/site'
import { Button, PageHero, Reveal, SoftCard } from '../components/ui'

export function ProceedingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Proceedings"
        title={
          <>
            Browse accepted papers by <em className="font-serif italic">session</em>
          </>
        }
        description="Author details, abstracts, and presentation materials will be listed here as the Day 1 Academic Research Conference programme is confirmed."
        actions={
          <Button to="/call-for-papers" variant="lime">
            Submit Abstract
          </Button>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Theme tracks</h2>
            <p className="mt-2 text-muted">
              Accepted contributions will be scheduled across these thematic sessions.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {themes.map((theme, i) => (
              <Reveal key={theme} delay={i * 0.03}>
                <SoftCard>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Session track {i + 1}
                  </p>
                  <p className="mt-2 font-semibold">{theme}</p>
                  <p className="mt-2 text-sm text-muted">
                    Abstracts will be published here shortly after acceptance notifications.
                  </p>
                </SoftCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
