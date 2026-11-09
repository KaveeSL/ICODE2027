import { registrationFees, registrationIncludes, site } from '../data/site'
import { Button, PageHero, Reveal, SerifAccent, SoftCard } from '../components/ui'

export function RegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Registration"
        title={
          <>
            Secure your place at <em className="inline-block pr-[0.2em] font-serif italic leading-none">ICODE2027</em>
          </>
        }
        description="Registration will open for authors, delegates, and workshop participants. Fees and programme access details are listed below."
        actions={
          <>
            <Button href={`mailto:${site.email}?subject=ICODE2027%20Registration`} variant="lime">
              Request registration
            </Button>
            <Button to="/call-for-papers" variant="glass">
              Call for Papers
            </Button>
          </>
        }
      />

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Registration <SerifAccent>fees</SerifAccent>
            </h2>
            <p className="mt-2 text-muted">
              Registration was free for all accepted authors. Accepted authors must still complete
              registration by the deadline to confirm their presentation slot.
            </p>
          </Reveal>

          <div className="mt-8 overflow-x-auto rounded-[1.75rem] border border-line bg-white">
            <table className="w-full min-w-[280px] text-left text-sm">
              <caption className="sr-only">ICODE2027 registration fees by category</caption>
              <thead className="bg-surface text-[11px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-4 font-semibold sm:px-5">Category</th>
                  <th className="px-4 py-4 font-semibold sm:px-5">Fee</th>
                </tr>
              </thead>
              <tbody>
                {registrationFees.map((row) => (
                  <tr key={row.category} className="border-t border-line">
                    <td className="px-4 py-4 font-medium sm:px-5">{row.category}</td>
                    <td className="px-4 py-4 sm:px-5">
                      <span
                        className={
                          row.highlight
                            ? 'inline-block rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink'
                            : 'font-semibold'
                        }
                      >
                        {row.fee}
                      </span>
                      {row.secondaryFee ? (
                        <span className="mt-1 block text-muted sm:ml-2 sm:mt-0 sm:inline">
                          {row.secondaryFee}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What registration <SerifAccent>includes</SerifAccent>
            </h2>
            <p className="mt-2 text-muted">
              Registration provides access to the public components of ICODE2027, including:
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {registrationIncludes.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <SoftCard className="bg-white hover:bg-white">
                  <p className="text-sm font-medium">{item}</p>
                </SoftCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
