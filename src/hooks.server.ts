import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

const preloadFonts: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => type === 'font'
	});

	return response;
};

// export const handleAuth: Handle = async ({ event, resolve }) => {

// 	const sessionId = event.cookies.get(lucia.sessionCookieName);
// 	if (!sessionId) {
// 		event.locals.user = null;
// 		event.locals.session = null;
// 		return resolve(event);
// 	}

// 	const { session, user } = await lucia.validateSession(sessionId);
// 	if (session && session.fresh) {
// 		const sessionCookie = lucia.createSessionCookie(session.id);

// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: '.',
// 			...sessionCookie.attributes
// 		});
// 	}
// 	if (!session) {
// 		const sessionCookie = lucia.createBlankSessionCookie();
// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: '.',
// 			...sessionCookie.attributes
// 		});
// 	}
// 	event.locals.user = user;
// 	event.locals.session = session;
// 	if (
// 		event.url.pathname.startsWith('/') &&
// 		!event.locals.user &&
// 		!['/login', '/register'].includes(event.url.pathname)
// 	) {
// 		console.log('redirecting to login');
// 		redirect(303, '/login');
// 	}
// 	return resolve(event);
// };
export const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName) || '';

	const { session, user } = await lucia.validateSession(sessionId);

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		event.locals.user = null;
		event.locals.session = null;
	} else {
		if (session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		event.locals.user = user;
		event.locals.session = session;
	}

	if (
		event.url.pathname.startsWith('/') &&
		!event.locals.user &&
		!['/login', '/register'].includes(event.url.pathname)
	) {
		console.log('i ran');
		redirect(303, '/login');
	} else {
		console.log('i ran too');

		return resolve(event);
	}
};
export const handle = sequence(preloadFonts, handleAuth);
