import React from "react";
import ReactMarkdown from "react-markdown";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="w-full max-w-4xl mx-auto py-6 text-slate-300 leading-relaxed font-sans">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 border-b border-slate-800 pb-3 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-white mt-6 mb-2 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base sm:text-lg font-semibold text-white mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 text-slate-300 mb-6 pl-2 text-base sm:text-lg">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 text-slate-300 mb-6 pl-2 text-base sm:text-lg">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-300 leading-relaxed inline-block w-full">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-purple-500 bg-purple-500/10 p-4 sm:p-5 rounded-r-2xl italic text-purple-200 my-6 text-base sm:text-lg">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4 transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-slate-800 my-10" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 border border-slate-800 rounded-2xl shadow-xl bg-slate-900/40">
              <table className="w-full text-left border-collapse text-sm sm:text-base text-slate-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-900 border-b border-slate-800 text-white font-bold">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/60">{children}</tbody>
          ),
          th: ({ children }) => (
            <th className="p-3 sm:p-4 border-r border-slate-800 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 sm:p-4 border-r border-slate-800 last:border-r-0">
              {children}
            </td>
          ),
          pre: ({ children }) => (
            <pre className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 overflow-x-auto my-6 text-slate-100 font-mono text-sm leading-relaxed shadow-2xl">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="bg-slate-900 border border-slate-800 text-purple-300 px-1.5 py-0.5 rounded-lg font-mono text-xs sm:text-sm font-medium">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}   