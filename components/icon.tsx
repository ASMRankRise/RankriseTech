import type { SVGProps } from "react";

export type IconName =
  | "arrow-right" | "arrow-up-right" | "chevron-down" | "menu" | "close"
  | "code" | "brain" | "window" | "phone" | "cloud" | "workflow"
  | "image" | "file" | "copy" | "check" | "layers";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <><path d="M4 12h15M13 5l7 7-7 7" /></>,
  "arrow-up-right": <><path d="M6 18 18 6M6 6h12v12" /></>,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M6 18 18 6" /></>,
  code: <><path d="m7 7-5 5 5 5M17 7l5 5-5 5M14 4l-4 16" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-5 3 4 4 0 0 0-1 7 3.5 3.5 0 0 0 6 5M15 4a3 3 0 0 1 5 3 4 4 0 0 1 1 7 3.5 3.5 0 0 1-6 5M9 3v18M15 3v18M4 8h2M3 14h3M18 8h2M18 14h3M9 8h6M9 15h6" /></>,
  window: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h5M7 16h9" /></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4M11 18h2" /></>,
  cloud: <><path d="M6 18a4 4 0 0 1-.3-8A6.5 6.5 0 0 1 18 8a5 5 0 0 1 0 10H6Z" /><path d="m9 13 3-3 3 3M12 10v11" /></>,
  workflow: <><rect x="2" y="3" width="7" height="6" rx="1" /><rect x="15" y="15" width="7" height="6" rx="1" /><path d="M9 6h9v6M15 18H6v-6M3 14l3-3 3 3M15 10l3 3 3-3" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="1.5" /><path d="m3 17 5-5 4 4 4-6 5 7" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M8 12h8M8 16h5" /></>,
  copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
  check: <path d="m4 12 5 5L20 6" />,
  layers: <><path d="m12 3 10 6-10 6L2 9l10-6ZM2 13l10 6 10-6M2 17l10 6 10-6" /></>,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {paths[name]}
    </svg>
  );
}
