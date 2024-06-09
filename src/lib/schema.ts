import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const todos = pgTable('todos', {
	id: serial('id').primaryKey(),
	task: text('task').notNull(),
	completed: boolean('completed').default(false)
});

export type InsertUser = typeof todos.$inferInsert;
export type SelectUser = typeof todos.$inferSelect;
export const todoSchema = createInsertSchema(todos, {
	task: (schema) => schema.task.min(3)
});
