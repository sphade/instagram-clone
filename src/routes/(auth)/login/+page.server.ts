import { userTable } from '$lib/schema';
import { lucia } from '$lib/server/auth.js';
import { db } from '$lib/server/db';
import { loginSchema } from '$lib/validator';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Scrypt } from 'lucia';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const [user] = await db.select().from(userTable).where(eq(userTable.email, form.data.email));
		if (!user) {
			return setError(form, 'email', 'this email is not correct');
		}
		const scrypt = new Scrypt();
		const validPassword = await scrypt.verify(user.passwordHash, form.data.password);

		if (!validPassword) {
			return setError(form, 'password', 'invalid password');
		}
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
