'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project, TagVariant } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

function tagClass(variant: TagVariant): string {
  if (variant === 'interior') return 'bg-[#f0dade] text-[#7a4455]';
  if (variant === 'exterior') return 'bg-[#d8e4d1] text-[#4a5e3e]';
  return 'bg-[#f7f3ee] text-[#7a6e63] border border-[#d9cbbe]';
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { name, sub, year, tags, imgStyle, imgLabel, featured, id } = project;

  const hasImage = imgStyle.startsWith('/') || imgStyle.startsWith('http');
  const bgValue = imgStyle
    .replace(/^background:\s*/i, '')
    .replace(/;$/, '')
    .trim();

  return (
    <Link
      href={`/work/${id}`}
      className={cn(
        'project-card group relative flex flex-col bg-[#ede5dc] rounded-[6px] overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a0a4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3ee]',
        featured && 'col-span-full grid grid-cols-[1.35fr_1fr] max-md:grid-cols-1',
      )}
      data-cursor="view"
      aria-label={`View case study: ${name.replace(/\n/g, ' ')} — ${sub}`}
    >
      {/* Image area */}
      <div
        className={cn(
          'relative overflow-hidden',
          featured
            ? 'min-h-[320px] max-md:min-h-[220px] xs:min-h-[180px]'
            : 'aspect-[4/3]',
        )}
        style={hasImage ? undefined : { background: bgValue }}
      >
        {hasImage ? (
          <Image
            src={imgStyle}
            alt={imgLabel}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          />
        ) : (
          <div
            aria-label={imgLabel}
            className="absolute inset-0 transition-[clip-path,transform] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[clip-path:inset(4%_4%_4%_4%_round_2px)]"
            style={{
              background: bgValue,
              clipPath: 'inset(0% 0% 0% 0%)',
            }}
          />
        )}

        {/* Subtle warm scrim on hover — deepens the image without darkening aggressively */}
        <div
          className="absolute inset-0 bg-[#2b2a27] opacity-0 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Project body */}
      <div
        className={cn(
          'bg-white',
          featured
            ? 'flex flex-col justify-end p-8 px-9 xs:p-5 xs:px-6'
            : 'p-5 pb-6 px-6 flex flex-col justify-between self-stretch grow',
        )}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-[0.65rem]">
          {tags.map((t) => (
            <span
              key={t.label}
              className={cn(
                'text-[0.5625rem] tracking-[0.1em] uppercase px-[0.6rem] py-1 rounded-full font-medium',
                tagClass(t.variant),
              )}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3
          className={cn(
            'font-serif font-normal text-[#2b2a27] leading-[1.2] mb-[0.4rem] transition-colors duration-300 group-hover:text-[#3d3830]',
            featured ? 'text-[1.75rem] xs:text-[1.375rem]' : 'text-[1.25rem]',
          )}
        >
          {name.split('\n').map((line, i) => (
            <span key={`${id}-name-${i}`} className="block">
              {line}
            </span>
          ))}
        </h3>

        {/* Sub */}
        <p className="text-[0.8125rem] text-[#7a6e63] font-light">{sub}</p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-[0.875rem] border-t border-[#f0ece6]">
          <span className="text-[0.5625rem] tracking-[0.2em] uppercase text-[#7a6e63]">
            {year}
          </span>
          <span
            className="text-base text-[#7a6e63] transition-[transform,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#2b2a27]"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}