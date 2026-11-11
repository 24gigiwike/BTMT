import React from 'react';
import type { MdInline } from '../../blog/markdown';
import { parseMarkdown } from '../../blog/markdown';
import { SITE_ORIGIN } from '../../blog/urls';
import { useApp } from '../../context/AppContext';

export const ArticleBody: React.FC<{ markdown: string }> = ({ markdown }) => {
  const blocks = parseMarkdown(markdown);
  return (
    <div className="py-8 space-y-6 text-base leading-relaxed text-slate-800">
      {blocks.map((block, index) => {
        if (block.type === 'heading' && block.level === 2) {
          return (
            <h2 key={index} className="text-2xl font-bold text-[#051449] pt-4">
              <InlineText inlines={block.inlines} />
            </h2>
          );
        }
        if (block.type === 'heading' && block.level === 3) {
          return (
            <h3 key={index} className="text-xl font-bold text-[#051449] pt-2">
              <InlineText inlines={block.inlines} />
            </h3>
          );
        }
        if (block.type === 'heading') {
          return (
            <h4 key={index} className="text-lg font-bold text-[#051449] pt-2">
              <InlineText inlines={block.inlines} />
            </h4>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={index} className="space-y-2 list-disc pl-6 text-slate-700">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <InlineText inlines={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'ol') {
          return (
            <ol key={index} className="space-y-2 list-decimal pl-6 text-slate-700">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <InlineText inlines={item} />
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === 'quote') {
          return (
            <blockquote key={index} className="border-l-2 border-[#12A9DB] pl-4 text-slate-700">
              <InlineText inlines={block.inlines} />
            </blockquote>
          );
        }
        return (
          <p key={index} className="text-slate-700 leading-relaxed">
            <InlineText inlines={block.inlines} />
          </p>
        );
      })}
    </div>
  );
};

const InlineText: React.FC<{ inlines: MdInline[] }> = ({ inlines }) => {
  const { navigateTo } = useApp();
  return (
    <>
      {inlines.map((inline, index) => {
        if (inline.type === 'strong') return <strong key={index} className="font-bold text-[#051449]">{inline.text}</strong>;
        if (inline.type === 'em') return <em key={index}>{inline.text}</em>;
        if (inline.type === 'link') {
          const internal = isInternalHref(inline.href);
          return (
            <a
              key={index}
              href={inline.href}
              className="text-[#051449] underline decoration-[#12A9DB] underline-offset-4"
              {...(internal
                ? {}
                : { target: '_blank', rel: 'noopener noreferrer' })}
              onClick={(event) => {
                if (!internal) return;
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                const url = new URL(inline.href, window.location.origin);
                navigateTo(`${url.pathname}${url.search}`);
              }}
            >
              {inline.text}
            </a>
          );
        }
        return <React.Fragment key={index}>{inline.text}</React.Fragment>;
      })}
    </>
  );
};

function isInternalHref(href: string): boolean {
  if (href.startsWith('/') && !href.startsWith('//')) return true;
  try {
    const url = new URL(href);
    return url.origin === window.location.origin || url.origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}
