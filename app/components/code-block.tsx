// File: app/components/code-block.tsx

// Inspired by Chatbot-UI and modified to fit the needs of this project
// https://github.com/mckaywrigley/chatbot-ui/blob/main/components/messages/message-codeblock.tsx

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface CodeBlockProps {
  language: string
  value: string
}

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <div className="relative w-full font-sans codeblock bg-zinc-950">
      <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
      </div>
      <SyntaxHighlighter
        PreTag="div"
        showLineNumbers
        language={language}
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem',
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
