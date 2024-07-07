import { postTable, userTable } from '$lib/schema/index.js';
import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const { userId } = params;
	const userWithPost = await db.query.userTable.findFirst({
		where: eq(userTable.id, userId),
		with: {
			posts: {
				orderBy: [desc(postTable.createdAt)]
			}
		}
	});
	if (!userWithPost) {
		error(404, 'User not found');
	}
	return { userWithPost };
};
