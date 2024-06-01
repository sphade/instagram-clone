import { sequence } from '@sveltejs/kit/hooks';
import { type Handle } from '@sveltejs/kit';

const preloadFonts: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => type === 'font'
	});

	return response;
};

export const handle = sequence(preloadFonts);
