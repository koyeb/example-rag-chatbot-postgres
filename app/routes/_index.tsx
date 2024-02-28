import { useChat } from 'ai/react'
import { useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { Input } from '~/components/ui/input'
import { useActionData } from '@remix-run/react'
import { useToast } from '~/components/ui/use-toast'
import KnowledgeBase from '~/components/knowledge-base'
import { ActionFunctionArgs, json } from '@remix-run/node'
import MemoizedMD from '~/components/memoized-react-markdown'
import { generateEmbeddingQuery, saveEmbedding } from '~/postgres/embedding.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const content = formData.get('content') as string
  if (content) {
    const messages = content.split(',').map((i: string) => i.trim())
    if (messages.length > 0) {
      await Promise.all(
        messages.map(async (information: string) => {
          const embedding = await generateEmbeddingQuery(information)
          if (embedding) saveEmbedding(information, embedding)
        }),
      )
      return json({ code: 1 })
    }
  }
  return json({ code: 0 })
}

export default function Index() {
  const { toast } = useToast()
  const actionData = useActionData<typeof action>()
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  useEffect(() => {
    if (actionData) {
      if (actionData['code'] === 1) {
        toast({
          description: 'Knowledge base updated succesfully.',
        })
        const formSelector = document.getElementById('rag') as HTMLFormElement
        if (formSelector) formSelector.reset()
      } else {
        toast({
          description: 'There was an error in updating the knowledge base.',
        })
      }
    }
  }, [actionData])
  return <>
    <KnowledgeBase />
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-start w-full max-w-lg px-5 overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-row w-[75vw] max-w-[500px] items-center space-x-2 fixed bottom-4">
          <Input
            id="message"
            value={input}
            type="message"
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="What's your next question?"
            className="border-black/25 hover:border-black placeholder:text-black/75 rounded"
          />
          <button className="size-6 flex flex-col border border-black/50 items-center justify-center absolute right-3 rounded-full hover:bg-black hover:text-white" type="submit">
            <ChevronRight size={18} />
          </button>
        </form>
        <div className="w-full flex flex-col max-h-[90vh] overflow-y-scroll">
          {messages.map((i, _) => (
            <MemoizedMD key={_} index={_} message={i.content} />
          ))}
        </div>
      </div>
    </div>
  </>
}
