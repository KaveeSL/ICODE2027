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
        className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}
        aria-label="Host institutions"
      >
        {hosts.map((host) => (
          <div key={host.name} className="flex min-w-0 items-center gap-2">
            <img
              src={host.src}
              alt=""
              className="h-7 w-auto max-w-[44px] shrink-0 object-contain sm:h-8 sm:max-w-[52px]"
            />
            <p className="min-w-0 text-[13px] leading-tight tracking-tight text-black">
              <span className="font-medium">{host.name}</span>
              <span className="whitespace-nowrap text-black/40"> · {host.role}</span>
            </p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {hosts.map((host) => (
        <div key={host.name} className="flex min-w-0 items-center gap-2">
          <img
            src={host.src}
            alt=""
            className="h-7 w-auto max-w-[40px] shrink-0 object-contain sm:h-8 sm:max-w-[48px]"
          />
          <p className="min-w-0 text-[13px] leading-tight tracking-tight text-white">
            <span className="font-medium">{host.name}</span>
            <span className="whitespace-nowrap text-white/45"> · {host.role}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

export { uomLogo, codlLogo, hosts as hostInstitutions }
