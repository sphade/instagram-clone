import { loginSchema } from '$lib/validator';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		// const [user] = await db.select().from(userTable).where(eq(userTable.email, form.data.email));
		// if (!user) {
		// 	return setError(form, 'email', 'this email is not correct');
		// }
		// const inputPasswordBytes = new TextEncoder().encode(form.data.password);
		// console.log('🚀 ~ default: ~ inputPasswordBytes:', inputPasswordBytes);
		// const hashedInputPassword = sha256(inputPasswordBytes);
		// console.log('🚀 ~ default: ~ hashedInputPassword:', hashedInputPassword);
		// const saltArray = new Uint8Array(16);
		// const salt = crypto.getRandomValues(saltArray);
		// const result = argon2id(form.data.password, salt, { t: 2, m: 65536, p: 1 });
		// console.log('🚀 ~ default: ~ result:', result);
		// const validPassword = user.passwordHash.every(
		// 	(value, index) => value === hashedInputPassword[index]
		// );
		// const validPassword = await verify(user.passwordHash, form.data.password, {
		// 	memoryCost: 19456,
		// 	timeCost: 2,
		// 	outputLen: 32,
		// 	parallelism: 1
		// });
		// if (!validPassword) {
		// 	return setError(form, 'password', 'invalid password');
		// }
		// const session = await lucia.createSession(user.id, {});
		// const sessionCookie = lucia.createSessionCookie(session.id);
		// cookies.set(sessionCookie.name, sessionCookie.value, {
		// 	path: '.',
		// 	...sessionCookie.attributes
		// });

		// redirect(302, '/');
	}
};
