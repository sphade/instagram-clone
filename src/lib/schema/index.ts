import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// Create the Drizzle table using the Zod schema
export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	firstName: varchar('first_name', { length: 50 }).notNull(),
	lastName: varchar('last_name', { length: 50 }).notNull(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull()
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

export const postTable = pgTable('posts', {
	id: serial('id').primaryKey(),
	userId: text('user_id')
		.references(() => userTable.id)
		.notNull(),
	caption: text('caption'),
	imageUrl: text('image_url').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});
export const likeTable = pgTable('likes', {
	id: serial('id').primaryKey(),
	postId: integer('post_id')
		.references(() => postTable.id)
		.notNull(),
	userId: text('user_id')
		.references(() => userTable.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const userRelation = relations(userTable, ({ many }) => ({
	posts: many(postTable)
}));
export const postRelation = relations(postTable, ({ one, many }) => ({
	user: one(userTable, {
		fields: [postTable.userId],
		references: [userTable.id]
	}),
	likes: many(likeTable)
}));
