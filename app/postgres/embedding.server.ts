// File: app/postgres/embedding.server.ts

import pool from './db.server'
import { toSql } from 'pgvector/pg'
import { embedding } from 'litellm'

interface Row {
  metadata: string
  distance: number
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

// Utility to save embeddings in the Koyeb managed postgres instance
export const saveEmbedding = async (metadata: string, embedding: string): Promise<void> => {
  try {
    await pool.query({
      text: 'INSERT INTO data (metadata, embedding) VALUES ($1, $2)',
      values: [metadata, embedding],
    })
  } catch (e) {
    console.log(getErrorMessage(e))
  }
}

// Utility to find relevant embeddings from the Koyeb managed postgres instance
export const findRelevantEmbeddings = async (embedding: string): Promise<Row[] | undefined> => {
  try {
    const res = await pool.query('SELECT metadata, embedding <-> $1 AS distance FROM data ORDER BY distance LIMIT 3', [embedding])
    return res.rows
  } catch (e) {
    console.log(getErrorMessage(e))
  }
}

// Utility to create embedding vector using OpenAI via LiteLLM
export const generateEmbeddingQuery = async (input: string): Promise<string | undefined> => {
  try {
    // Generate embeddings of a message using OpenAI via LiteLLM
    const embeddingData = await embedding({
      input,
      model: 'text-embedding-3-small',
    })
    return toSql(embeddingData.data[0].embedding)
  } catch (e) {
    console.log(getErrorMessage(e))
  }
}
