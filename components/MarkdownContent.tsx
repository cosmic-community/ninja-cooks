'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl sm:text-3xl font-black text-white mt-8 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-flame-light mt-5 mb-2">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-ninja-100 mt-4 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-ninja-200 text-base leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-ninja-100">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 mb-4 text-ninja-200 pl-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 mb-4 text-ninja-200 pl-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-ninja-200 leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-flame pl-4 py-1 my-4 italic text-ninja-300 bg-flame/5 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className="block bg-ninja-800 text-flame-light rounded-lg px-4 py-3 text-sm font-mono overflow-x-auto mb-4">
          {children}
        </code>
      );
    }
    return (
      <code className="bg-ninja-800 text-flame-light rounded px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto">{children}</pre>
  ),
  hr: () => <hr className="border-dojo-border my-6" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-flame-light underline hover:text-flame transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
