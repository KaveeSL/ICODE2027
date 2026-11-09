import { governanceGroups } from '../data/site'
import { PageHero, Reveal, SerifAccent, SoftCard } from '../components/ui'

export function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Governance & Committee"
        title={
          <>
            Ethics, quality assurance & <em className="font-serif italic">governance</em>
          </>
        }
        description="Organising committee and governance for ICODE2027, the international research conference hosted by CODL at the University of Moratuwa."
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-10">
          {governanceGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <div id={group.id} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {group.title.slice(0, group.title.lastIndexOf(' '))}{' '}
                  <SerifAccent>{group.title.slice(group.title.lastIndexOf(' ') + 1)}</SerifAccent>
                </h2>
                <p className="mt-2 max-w-3xl text-muted">{group.description}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {group.people.map((person) => (
                    <SoftCard key={person.name} className="bg-white hover:bg-white">
                      <p className="text-lg font-semibold tracking-tight">{person.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{person.role}</p>
                    </SoftCard>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
