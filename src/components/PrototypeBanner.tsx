import { DEMO_BANNER_CONFIG } from '../demoBanner.config';

export function PrototypeBanner() {
  return (
    <div className="w-full bg-amber-400 px-3 py-1.5 text-center text-xs leading-4 text-gray-900 sm:px-4 sm:py-2 lg:whitespace-nowrap">
      Esta marca no existe. Este sitio es un prototipo de{' '}
      <a
        href={DEMO_BANNER_CONFIG.link}
        className="font-semibold underline underline-offset-2"
      >
        {DEMO_BANNER_CONFIG.companyName}
      </a>
      . Si querés un sitio como este para tu negocio, visitanos acá.
    </div>
  );
}