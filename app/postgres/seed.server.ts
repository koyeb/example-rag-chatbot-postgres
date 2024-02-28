// File: app/postgres/seed.server.ts

import { generateEmbeddingQuery, saveEmbedding } from './embedding.server'

const About = [
  'Rishi is a quick learner.',
  "Rishi is blown away by Koyeb's service.",
  'Rishi has been happy using Postgres so far.',
  'Rishi is having fun marketing www.launchfa.st.',
  'Rishi is super excited to collaborate on technical writing.',
]

async function seed() {
  await Promise.all(
    About.map(async (information: string) => {
      const embedding = await generateEmbeddingQuery(information)
      if (embedding) saveEmbedding(information, embedding)
    }),
  )
  console.log('Finished seeding the database.')
}

seed()
