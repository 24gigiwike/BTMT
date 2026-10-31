import React, { useState } from 'react';

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
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Official BTMT Logo */}
      <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex items-center justify-center overflow-hidden">
        {!imageError ? (
          <img
            src="https://ik.imagekit.io/019999great/IMG_0065.PNG"
            alt="Blissful Touch Media & Technology Logo"
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-10 h-10 rounded-sm bg-[#051449] text-white flex items-center justify-center font-bold text-sm tracking-widest">
            BTMT
          </div>
        )}
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-bold tracking-tight text-lg sm:text-xl uppercase ${
              isLight ? 'text-white' : 'text-[#051449]'
            }`}
          >
            BTMT
          </span>
          <span
            className={`hidden sm:inline-block text-[11px] font-medium tracking-wider uppercase ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            | Blissful Touch
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[10px] sm:text-[11px] tracking-wide mt-1 uppercase font-normal ${
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
