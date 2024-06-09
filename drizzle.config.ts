import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
export default defineConfig({
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	schema: './src/lib/schema.ts',
	out: './migrations'
});
