import { userTable } from '$lib/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const registerSchema = createInsertSchema(userTable, {
	email: (schema) => schema.email.email(),
	firstName: (s) => s.firstName.min(1, { message: 'first name is required' }),
	lastName: (s) => s.lastName.min(1)
}).extend({
	password: z.string().min(8)
});

registerSchema.parse;
