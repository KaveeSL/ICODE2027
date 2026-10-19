import uomLogo from '../assets/logo/logo.png'
import codlLogo from '../assets/logo/codllogo.png'

type HostLogosProps = {
  variant?: 'nav' | 'about' | 'footer'
  className?: string
}

const hosts = [
  {
    name: 'University of Moratuwa',
    role: 'Hosting Partner',
    src: uomLogo,
  },
  {
    name: 'Centre for Open and Distance Learning (CODL)',
    role: 'Organised by',
    src: codlLogo,
  },
] as const

export function HostLogos({ variant = 'footer', className = '' }: HostLogosProps) {
  if (variant === 'nav') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`} aria-label="Host institutions">
        {hosts.map((host) => (
          <img
            key={host.name}
            src={host.src}
            alt={host.name}
            title={host.name}
            className="h-9 w-auto object-contain sm:h-10"
          />
        ))}
      </div>
    )
  }

  if (variant === 'about') {
    return (
      <div
        className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}
        aria-label="Host institutions"
      >
        {hosts.map((host) => (
          <div key={host.name} className="flex min-w-0 items-center gap-2.5">
            <img
              src={host.src}
              alt={host.name}
              className="h-9 w-auto max-w-[84px] object-contain sm:h-11 sm:max-w-[100px]"
            />
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 sm:text-[11px]">
              {host.role}
            </p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${className}`}>
      {hosts.map((host) => (
        <div key={host.name} className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img
            src={host.src}
            alt={host.name}
            className="h-9 w-auto max-w-[72px] object-contain sm:h-11 sm:max-w-none"
          />
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/45">{host.role}</p>
        </div>
      ))}
    </div>
  )
}

export { uomLogo, codlLogo, hosts as hostInstitutions }
