import { postTable, userTable } from '$lib/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const registerSchema = createInsertSchema(userTable, {
	email: (schema) => schema.email.email(),
	firstName: (s) => s.firstName.min(1, { message: 'first name is required' }),
	lastName: (s) => s.lastName.min(1)
}).extend({
	password: z.string().min(8)
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export const postSchema = createInsertSchema(postTable, {
	imageUrl: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
}).omit({
	userId: true
});
