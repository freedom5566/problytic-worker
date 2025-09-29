import type { Handle } from '@sveltejs/kit';

import type { ClientUsersSession } from '$lib/server/schema/ClientUsersSession';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id');

	if (sessionId) {
		const stmt = await event.platform.env.DB.prepare(
			'SELECT user_id FROM client_users_session WHERE sid = ? AND strftime("%s", expires_at) > strftime("%s", "now")'
		);

		const { results } = await stmt.bind(sessionId).run();
		if (Array.isArray(results) && results.length > 0) {
			event.locals.userId = (results[0] as ClientUsersSession).user_id;
		}
	}

	const response = await resolve(event);
	return response;
};
