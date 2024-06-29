import { postSchema } from '$lib/validator';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { user } }) => {
	if (!user) {
		error(401, 'Unauthorized');
	}

	const postForm = await superValidate(zod(postSchema));
	return { postForm, user };
};
