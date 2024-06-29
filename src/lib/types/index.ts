import { postTable, userTable } from '$lib/schema';

export type InsertUser = typeof userTable.$inferInsert;
export type User = typeof userTable.$inferSelect;
export type Post = typeof postTable.$inferSelect;
export type PostWithUser = Post & { user: Omit<User, 'passwordHash'> };
