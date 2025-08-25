import type { Handle } from '@sveltejs/kit';
import type { ClientUsersSession } from '$lib/server/schema/ClientUsersSession';

export const handle: Handle = async ({ event, resolve, platform }) => {
	const sessionId = event.cookies.get('session_id');

	if (sessionId) {
		const stmt = await platform.env.DB.prepare(
			'SELECT user_id FROM client_users_session WHERE sid = ? AND expires_at > NOW()'
		);
		const { results } = await stmt.bind(sessionId).run();
		if (Array.isArray(results) && results.length > 0) {
			event.locals.userId = (results[0] as ClientUsersSession).user_id;
		}
	}

	const response = await resolve(event);
	return response;
};
