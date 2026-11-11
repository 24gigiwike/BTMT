import React from 'react';
import { useApp } from '../../context/AppContext';
import { buildHref } from '../../routing';

interface SiteLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  params?: Record<string, string>;
}

/** Real href for crawlers, with in-app navigation for visitors. */
export const SiteLink: React.FC<SiteLinkProps> = ({ to, params, onClick, children, ...rest }) => {
  const { navigateTo } = useApp();
  const href = buildHref(to, params);

  return (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigateTo(to, params);
      }}
    >
      {children}
    </a>
  );
};
