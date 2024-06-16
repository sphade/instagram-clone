import { lucia } from '$lib/server/auth.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { user } }) => {
	return { user };
};

export const actions = {
	logOut: async ({ locals: { session }, cookies }) => {
		if (!session) {
			return fail(401);
		}
		const sessionId = session?.id;
		await lucia.invalidateSession(sessionId);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
};
