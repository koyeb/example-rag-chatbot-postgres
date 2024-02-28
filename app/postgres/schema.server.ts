// File: app/postgres/schema.server.ts

import pool from './db.server'

async function createSchema() {
  // Create the vector extension if it does not exist
  await pool.query('CREATE EXTENSION IF NOT EXISTS vector;')
  // Create the data table if it does not exist
  await pool.query('CREATE TABLE IF NOT EXISTS data (id SERIAL PRIMARY KEY, metadata text, embedding vector(1536));')
  console.log('Finished setting up the database.')
}

createSchema()
