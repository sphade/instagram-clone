import { userTable } from '$lib/schema';

export type InsertUser = typeof userTable.$inferSelect;
export type User = typeof userTable.$inferSelect;
