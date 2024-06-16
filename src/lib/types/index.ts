import { userTable } from '$lib/schema';

export type InsertUser = typeof userTable.$inferInsert;
export type User = typeof userTable.$inferSelect;
