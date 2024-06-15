import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// Create the Drizzle table using the Zod schema
export const userTable = pgTable('user', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 50 }).notNull(),
	lastName: varchar('last_name', { length: 50 }).notNull(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash')
});

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
