import React, { useState } from 'react';

interface CodeBlockProps {
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    const getFullUrl = (path: string) => {
      try {
        return new URL(path).toString();
      } catch (e) {
        return new URL(path, window.location.origin).toString();
      }
    };
    window.open(getFullUrl(children), '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="relative group bg-gray-900 rounded-md p-4 font-mono text-sm text-cyan-300 border border-gray-700 cursor-pointer hover:border-cyan-500 transition-colors"
      onClick={handleOpenLink}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpenLink();
        }
      }}
      aria-label={`Open link: ${children}`}
    >
      <pre className="overflow-x-auto whitespace-pre-wrap break-all">{children}</pre>
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default CodeBlock;
