// File: app/components/knowledge-base.tsx

import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { Form, useNavigation } from '@remix-run/react'

export default function KnowledgeBase() {
  const { state } = useNavigation()
  const [expanded, setExpanded] = useState(true)
  return (
    <Form id="rag" method="post" className="absolute top-0 border p-3 m-2 rounded right-0 flex flex-col items-start">
      <div className="cursor-pointer absolute top-1.5 right-1.5">
        <Maximize2
          size={12}
          className="fill-black"
          onClick={() => {
            setExpanded((expanded) => !expanded)
          }}
        />
      </div>
      {expanded && <span className="text-xs font-medium">Update Knowledge Base</span>}
      {expanded && (
        <textarea
          id="content"
          name="content"
          autoComplete="off"
          placeholder="Add to the existing knowledge base. Seperate sentences with comma (,)"
          className="mt-2 p-1 border border-black/25 outline-none text-xs h-[45px] w-[280px] rounded"
        />
      )}
      {expanded && (
        <button disabled={state === 'submitting'} className="mt-3 text-sm px-2 py-1 border rounded" type="submit">
          {state === 'submitting' ? <>Submitting...</> : <>Submit &rarr;</>}
        </button>
      )}
    </Form>
  )
}
