import Replicate from 'replicate'
import { json } from '@remix-run/node'
import type { ActionFunctionArgs } from '@remix-run/node'
import { ReplicateStream, StreamingTextResponse } from 'ai'
import { experimental_buildLlama2Prompt } from 'ai/prompts'
import { findRelevantEmbeddings, generateEmbeddingQuery } from '~/postgres/embedding.server'

// Instantiate the Replicate API
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export const action = async ({ request }: ActionFunctionArgs) => {
  // Set of messages between user and chatbot
  const { messages = [] } = await request.json()
  if (messages.length < 1) return json({ message: 'No conversation found.' })

  // Get the latest question stored in the last message of the chat array
  const userMessages = messages.filter((i: { role: string }) => i.role === 'user')
  const input = userMessages[userMessages.length - 1].content

  // Generate embeddings of the latest question using OpenAI
  const embedding = await generateEmbeddingQuery(input)
  if (!embedding) return json({ message: 'Error while generating embedding vector.' })

  // Fetch the relevant set of records based on the embedding
  let similarQuestions = await findRelevantEmbeddings(embedding)
  if (!similarQuestions) {
    similarQuestions = []
    console.log({ message: 'Error while finding relevant vectors.' })
  }

  // Combine all the metadata of the relevant vectors
  const contextFromMetadata = similarQuestions.map((i) => i.metadata).join('\n')
  // Now use Replicate LLAMA 70B streaming to perform the autocompletion with context
  const response = await replicate.predictions.create({
    // You must enable streaming.
    stream: true,
    // The model must support streaming. See https://replicate.com/docs/streaming
    model: 'meta/llama-2-70b-chat',
    // Format the message list into the format expected by Llama 2
    // @see https://github.com/vercel/ai/blob/99cf16edf0a09405d15d3867f997c96a8da869c6/packages/core/prompts/huggingface.ts#L53C1-L78C2
    input: {
      prompt: experimental_buildLlama2Prompt([
        {
          // create a system content message to be added as
          // the llama2prompt generator will supply it as the context with the API
          role: 'system',
          content: contextFromMetadata.substring(0, Math.min(contextFromMetadata.length, 2000)),
        },
        // also, pass the whole conversation!
        ...messages,
      ]),
    },
  })
  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
