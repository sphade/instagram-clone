import { userTable } from '$lib/schema';
import { lucia } from '$lib/server/auth.js';
import { db } from '$lib/server/db';
import { loginSchema } from '$lib/validator';
import { verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
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
		const validPassword = await verify(user.passwordHash, form.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
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
