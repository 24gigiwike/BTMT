import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = false
}) => {
  const isLight = variant === 'light';
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official BTMT Logo */}
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 flex items-center justify-center overflow-hidden">
        {!imageError ? (
          <img
            src="https://ik.imagekit.io/019999great/IMG_0065.PNG"
            alt="BTMT Logo"
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-9 h-9 rounded-sm bg-[#051449] text-white flex items-center justify-center font-bold text-sm tracking-widest">
            BTMT
          </div>
        )}
      </div>

      <div className="flex items-center">
        <span
          className={`font-bold tracking-tight text-xl sm:text-2xl uppercase leading-none ${
            isLight ? 'text-white' : 'text-[#051449]'
          }`}
        >
          BTMT
        </span>
        {showSubtitle && (
          <span
            className={`ml-2 text-xs uppercase tracking-wider leading-none ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Blissful Touch
          </span>
        )}
      </div>
    </div>
  );
};
