import { todoTable } from '$lib/schema/index.js';
import { db } from '$lib/server/db.js';
import { eq } from 'drizzle-orm';

export const load = async ({ locals: { user } }) => {
	let id = '';
	if (user) id = user.id;
	const todos = await db.query.todoTable.findMany({
		columns: {
			content: true
		},
		where: eq(todoTable.userId, id),
		with: {
			user: true
		}
	});
	// const todos = await db.select().from(todoTable).where(eq(todoTable.userId, id));

	return { todos };
};
export const actions = {
	default: async ({ locals: { user } }) => {
		if (user)
			await db.insert(todoTable).values({
				content: 'play play',
				userId: user.id
			});
	}
};
