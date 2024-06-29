import { lucia } from '$lib/server/auth.js';
import { postSchema } from '$lib/validator/index.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';
import { db } from '$lib/server/db.js';
import { postTable } from '$lib/schema/index.js';
import { desc } from 'drizzle-orm';

cloudinary.config({
	cloud_name: 'house-buy',
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true
});

export const load = async () => {
	const posts = await db.query.postTable.findMany({
		with: {
			user: {
				columns: {
					passwordHash: false
				}
			}
		},
		orderBy: [desc(postTable.createdAt)]
	});
	return { posts };
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
		redirect(303, '/login');
	},
	createPost: async ({ locals: { user }, request }) => {
		const form = await superValidate(request, zod(postSchema));
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}
		if (user) {
			const arraybuffer = await form.data.imageUrl.arrayBuffer();
			const buffer = Buffer.from(arraybuffer);
			const uploadResult: any = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{
							use_filename: true,
							unique_filename: true,
							overwrite: true
						},
						(error, result) => {
							if (error) reject(error);
							else resolve(result);
						}
					)
					.end(buffer);
			});
			await db.insert(postTable).values({
				imageUrl: uploadResult.public_id,
				userId: user.id,
				caption: form.data.caption
			});
			return withFiles({ form });
		}
	}
};
