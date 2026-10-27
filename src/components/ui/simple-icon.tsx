import React from 'react';
import * as SimpleIcons from 'simple-icons';
import type { SimpleIcon as SimpleIconData } from 'simple-icons';

export type { SimpleIconData };

export interface SimpleIconProps extends React.SVGProps<SVGSVGElement> {
  icon: SimpleIconData | string;
  size?: number | string;
  color?: string;
  useBrandColor?: boolean;
  className?: string;
  title?: string;
}

// Fallback LinkedIn definition in case not present in simple-icons upstream
const linkedinFallback: SimpleIconData = {
  title: 'LinkedIn',
  slug: 'linkedin',
  hex: '0A66C2',
  source: 'https://linkedin.com',
  svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
  path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
};

/**
 * Resolves a SimpleIconData object by direct object or string name/slug
 */
export function resolveSimpleIcon(iconOrName: SimpleIconData | string): SimpleIconData | null {
  if (typeof iconOrName !== 'string') {
    return iconOrName;
  }

  const raw = iconOrName.trim();
  const lower = raw.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (lower === 'linkedin') {
    return linkedinFallback;
  }

  // Direct key lookup (e.g. siReact)
  const directKey = `si${raw.charAt(0).toUpperCase()}${raw.slice(1)}`;
  if ((SimpleIcons as Record<string, unknown>)[directKey]) {
    return (SimpleIcons as Record<string, unknown>)[directKey] as SimpleIconData;
  }

  // Lookup by slug or key match
  const entries = Object.entries(SimpleIcons);
  for (const [key, value] of entries) {
    if (key.startsWith('si') && typeof value === 'object' && value !== null && 'slug' in value) {
      const icon = value as SimpleIconData;
      const slugNorm = icon.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
      const titleNorm = icon.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (slugNorm === lower || titleNorm === lower) {
        return icon;
      }
    }
  }

  return null;
}

/**
 * Maps technology names used across project cards and sections to Simple Icons
 */
export function getTechIcon(techName: string): SimpleIconData | null {
  const norm = techName.toLowerCase().trim();

  if (norm.includes('react three') || norm.includes('three.js') || norm.includes('threejs')) {
    return SimpleIcons.siThreedotjs;
  }
  if (norm.includes('react')) {
    return SimpleIcons.siReact;
  }
  if (norm.includes('next.js') || norm.includes('nextjs')) {
    return SimpleIcons.siNextdotjs;
  }
  if (norm.includes('gsap') || norm.includes('greensock')) {
    return SimpleIcons.siGreensock;
  }
  if (norm.includes('framer')) {
    return SimpleIcons.siFramer;
  }
  if (norm.includes('figma')) {
    return SimpleIcons.siFigma;
  }
  if (norm.includes('tailwind')) {
    return SimpleIcons.siTailwindcss;
  }
  if (norm.includes('graphql')) {
    return SimpleIcons.siGraphql;
  }
  if (norm.includes('python')) {
    return SimpleIcons.siPython;
  }
  if (norm.includes('pytorch')) {
    return SimpleIcons.siPytorch;
  }
  if (norm.includes('remix')) {
    return SimpleIcons.siRemix;
  }
  if (norm.includes('shopify')) {
    return SimpleIcons.siShopify;
  }
  if (norm.includes('vercel')) {
    return SimpleIcons.siVercel;
  }
  if (norm.includes('webflow')) {
    return SimpleIcons.siWebflow;
  }
  if (norm.includes('typescript')) {
    return SimpleIcons.siTypescript;
  }
  if (norm.includes('javascript')) {
    return SimpleIcons.siJavascript;
  }
  if (norm.includes('chrome')) {
    return SimpleIcons.siGooglechrome;
  }
  if (norm.includes('opengl') || norm.includes('glsl') || norm.includes('shader')) {
    return SimpleIcons.siOpengl;
  }
  if (norm.includes('vite')) {
    return SimpleIcons.siVite;
  }
  if (norm.includes('node') || norm.includes('express')) {
    return SimpleIcons.siNodedotjs;
  }
  if (norm.includes('docker')) {
    return SimpleIcons.siDocker;
  }
  if (norm.includes('postgres') || norm.includes('sql')) {
    return SimpleIcons.siPostgresql;
  }
  if (norm.includes('firebase')) {
    return SimpleIcons.siFirebase;
  }
  if (norm.includes('flutter')) {
    return SimpleIcons.siFlutter;
  }
  if (norm.includes('apple') || norm.includes('ios')) {
    return SimpleIcons.siApple;
  }
  if (norm.includes('android')) {
    return SimpleIcons.siAndroid;
  }
  if (norm.includes('google')) {
    return SimpleIcons.siGoogle;
  }
  if (norm.includes('github')) {
    return SimpleIcons.siGithub;
  }
  if (norm.includes('dribbble')) {
    return SimpleIcons.siDribbble;
  }
  if (norm.includes('css')) {
    return SimpleIcons.siCss;
  }
  if (norm.includes('lottie') || norm.includes('webassembly')) {
    return SimpleIcons.siWebassembly;
  }
  if (norm.includes('blender')) {
    return SimpleIcons.siBlender;
  }

  return resolveSimpleIcon(techName);
}

/**
 * SimpleIcon Component: Renders official vector brand/technology SVGs
 * compatible with simple-icons & vue3-simple-icons datasets.
 */
export const SimpleIcon: React.FC<SimpleIconProps> = ({
  icon,
  size = 20,
  color,
  useBrandColor = false,
  className = '',
  title,
  style,
  ...rest
}) => {
  const iconData = resolveSimpleIcon(icon);

  if (!iconData) {
    return null;
  }

  const fillColor = useBrandColor ? `#${iconData.hex}` : (color || 'currentColor');
  const accessibleTitle = title || iconData.title;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fillColor}
      className={`inline-block shrink-0 transition-colors ${className}`}
      style={style}
      aria-label={accessibleTitle}
      {...rest}
    >
      <title>{accessibleTitle}</title>
      <path d={iconData.path} />
    </svg>
  );
};

export default SimpleIcon;
