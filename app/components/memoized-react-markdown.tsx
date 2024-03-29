// File: app/components/memoized-react-markdown.tsx

import clsx from 'clsx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '~/components/code-block'
import { MemoizedReactMarkdown } from '~/components/mark'

const MemoizedMD = ({ message, index }) => {
  return (
    <MemoizedReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
          return <CodeBlock key={Math.random()} language={(match && match[1]) || ''} value={String(children).replace(/\n$/, '')} {...props} />
        },
      }}
      className={clsx('w-full mt-4 pt-4 prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0', index !== 0 && 'border-t')}
    >
      {message}
    </MemoizedReactMarkdown>
  )
}

export default MemoizedMD
