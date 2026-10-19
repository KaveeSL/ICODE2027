import {
  authorGuidelines,
  importantDates,
  site,
  templateSections,
  themes,
} from '../data/site'
import { Button, PageHero, Reveal, SoftCard, Eyebrow } from '../components/ui'

export function CallForPapersPage() {
  return (
    <>
      <PageHero
        eyebrow="Call for Papers"
        title={
          <>
            Submit your extended abstract to <em className="font-serif italic">ICODE2027</em>
          </>
        }
        description="2–3 page extended abstracts presenting research, design-based studies, innovative practices, policy analyses, or case studies in open and digital education."
        actions={
          <>
            <Button href={`mailto:${site.email}?subject=ICODE2027%20Abstract%20Submission`} variant="lime">
              Submit Abstract
            </Button>
            <Button to="/registration" variant="glass">
              Registration details
            </Button>
          </>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Key dates</h2>
            <p className="mt-2 text-muted">Plan your submission around these milestones.</p>
          </Reveal>
          <div className="mt-8 grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-4">
            {importantDates.slice(0, 4).map((item, i) => (
              <Reveal key={item.label} delay={i * 0.05} className="h-full">
                <SoftCard className="flex h-full flex-col">
                  <Eyebrow>{item.label}</Eyebrow>
                  <p className="mt-3 text-xl font-semibold">{item.date}</p>
                  <p className="mt-auto pt-1 text-sm text-muted">{item.note}</p>
                </SoftCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Conference Themes</h2>
            <p className="mt-2 text-muted">
              Submissions are invited under, but not limited to, the following themes.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {themes.map((theme, i) => (
              <Reveal key={theme} delay={i * 0.03}>
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-bold text-ink">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium sm:text-[15px]">{theme}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Extended Abstract Template — Section Overview
            </h2>
            <p className="mt-2 max-w-3xl text-muted">
              The ICODE2027 extended abstract template (2–3 pages) is designed to keep submissions
              focused while providing enough detail for rigorous review.
            </p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {templateSections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.04}>
                <SoftCard>
                  <p className="font-semibold">{section.title}</p>
                  <p className="mt-1 text-sm text-muted">{section.detail}</p>
                </SoftCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Author Guidelines</h2>
            <p className="mt-2 text-muted">Follow these checkpoints to make your submission review-ready.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <SoftCard className="bg-white hover:bg-white">
              <Eyebrow>Submission essentials</Eyebrow>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold">Language</dt>
                  <dd className="text-muted">{authorGuidelines.language}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Word limit</dt>
                  <dd className="text-muted">{authorGuidelines.wordLimit}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Length</dt>
                  <dd className="text-muted">{authorGuidelines.length}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Format</dt>
                  <dd className="text-muted">{authorGuidelines.format}</dd>
                </div>
              </dl>
            </SoftCard>
            <SoftCard className="bg-white hover:bg-white">
              <Eyebrow>Policies</Eyebrow>
              <div className="mt-4 space-y-4 text-sm text-muted">
                <p>{authorGuidelines.anonymity}</p>
                <p>{authorGuidelines.originality}</p>
                <p>{authorGuidelines.aiPolicy}</p>
              </div>
            </SoftCard>
          </div>
          <div className="mt-8 rounded-[1.75rem] bg-ink px-4 py-7 text-white sm:px-6 sm:py-8">
            <p className="text-sm text-white/60">Conference Secretariat</p>
            <p className="mt-2 text-base font-semibold leading-snug sm:text-lg">
              ICODE2027, Centre for Open and Distance Learning (CODL)
              <br />
              University of Moratuwa, Sri Lanka
            </p>
            <a href={`mailto:${site.email}`} className="mt-3 inline-block break-all text-lime">
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
