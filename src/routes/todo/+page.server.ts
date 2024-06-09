import { todoSchema, todos } from '$lib/schema';
import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(todoSchema));
	return { todos: await db.select().from(todos), form };
};

export const actions = {
	createTodo: async ({ request }) => {
		const form = await superValidate(request, zod(todoSchema));
		console.log('🚀 ~ createTodo: ~ form:', form);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const res = await db
				.insert(todos)
				.values({
					task: form.data.task
				})
				.returning();
			console.log('🚀 ~ res ~ res:', res);
			return { form };
		} catch (error) {
			console.log('🚀 ~ createTodo: ~ error:', error);
		}
	}
};
