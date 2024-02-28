// File: app/postgres/db.server.ts

// Load the environment variables
import 'dotenv/config'

// Load the postgres module
import pg from 'pg'

// Create a connection string to the Koyeb managed postgres instance
const connectionString: string = `${process.env.POSTGRES_URL}`

// Create a in-memory pool so that it's cached for multiple calls
export default new pg.Pool({ connectionString })
