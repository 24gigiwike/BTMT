import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = true
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Lockup representing Media, Technology & Growth */}
      <div className="relative w-9 h-9 rounded-lg bg-[#051449] border border-[#12A9DB]/30 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Subtle cyan arc for Media & Tech connection */}
          <path
            d="M6 18C6 11.3726 11.3726 6 18 6C24.6274 6 30 11.3726 30 18"
            stroke="#12A9DB"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Pale blue intersecting curve */}
          <path
            d="M10 24C10 19.5817 13.5817 16 18 16C22.4183 16 26 19.5817 26 24"
            stroke="#CDEEF8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Precision Red Accent Dot */}
          <circle cx="18" cy="11" r="2.2" fill="#E32938" />
          {/* Deep Navy/Purple anchor base */}
          <circle cx="18" cy="25" r="2.5" fill="#12A9DB" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-bold tracking-tight text-lg ${
              isLight ? 'text-white' : 'text-[#051449]'
            }`}
          >
            BTMT
          </span>
          <span
            className={`hidden sm:inline-block text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            | Blissful Touch
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[11px] leading-tight mt-0.5 tracking-tight ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Media & Technology
          </span>
        )}
      </div>
    </div>
  );
};
