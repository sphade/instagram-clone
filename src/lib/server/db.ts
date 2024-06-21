import { drizzle } from 'drizzle-orm/d1';import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';
import * as schema from '$lib/schema';

const sql = neon(DATABASE_URL);

// export const db = drizzle(sql, { schema });
  export const db = drizzle(env.<BINDING_NAME>);