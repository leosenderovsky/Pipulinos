import { DEMO_BANNER_CONFIG, getValidDemoBannerLink } from '../demoBanner.config';

export function PrototypeBanner() {
  const companyName = DEMO_BANNER_CONFIG.companyName === '[EMPRESA]' ? '' : DEMO_BANNER_CONFIG.companyName;
  const link = companyName ? getValidDemoBannerLink(DEMO_BANNER_CONFIG.link) : null;

  return (
    <div className="flex min-h-11 w-full items-center justify-center bg-amber-400 px-3 py-1.5 text-center text-[10px] leading-4 text-gray-900 sm:min-h-8 sm:px-4 sm:py-2 lg:min-h-0 lg:whitespace-nowrap lg:text-xs">
      {companyName ? (
        <>
          Esta marca no existe. Este sitio es un prototipo de{' '}
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
              {companyName}
            </a>
          ) : (
            <strong className="font-semibold">{companyName}</strong>
          )}
          .{link && ' Si querés un sitio como este para tu negocio, visitanos acá.'}
        </>
      ) : (
        <>Esta marca no existe. Este sitio es un prototipo de demostración de sitios web para comercios.</>
      )}
    </div>
  );
}