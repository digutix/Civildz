import type { SVGProps } from 'react';

// A small inline-SVG icon set keyed by name, so we avoid an icon dependency.
// All icons inherit `currentColor` and a 24x24 viewBox.
const paths: Record<string, React.ReactNode> = {
  book: (
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" />
  ),
  calculator: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14v4M8 18h4" />
    </>
  ),
  cube: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </>
  ),
  beam: (
    <>
      <path d="M3 9h18M3 15h18" />
      <path d="M6 9v6M18 9v6M10 9v6M14 9v6" />
    </>
  ),
  bricks: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 9h18M3 14h18M9 4v5M15 9v5M9 14v6M15 14v6" />
    </>
  ),
  ruler: (
    <>
      <path d="m21.3 8.7-8.6 8.6a2.4 2.4 0 0 1-3.4 0l-2.6-2.6a2.4 2.4 0 0 1 0-3.4l8.6-8.6a2.4 2.4 0 0 1 3.4 0l2.6 2.6a2.4 2.4 0 0 1 0 3.4Z" />
      <path d="M7.5 10.5 9 12M10.5 7.5 12 9M13.5 4.5 15 6" />
    </>
  ),
  swap: <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />,
  dig: (
    <>
      <path d="M3 20h18M5 20l2-7h6l2 7" />
      <path d="m13 9 3-3 4 4-3 3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  play: <path d="m6 3 14 9-14 9V3Z" />,
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  whatsapp: (
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  filled?: boolean;
}

export function Icon({ name, filled, ...props }: IconProps) {
  const isBrand = name === 'whatsapp';
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill={isBrand || filled ? 'currentColor' : 'none'}
      stroke={isBrand || filled ? 'none' : 'currentColor'}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? paths.document}
    </svg>
  );
}
