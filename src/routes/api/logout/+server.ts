// src/routes/api/logout/+server.ts
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ cookies, platform }) => {
	// 讀出 session_id
	const sessionId = cookies.get('session_id');

	if (sessionId) {
		const insert_stmt = await platform.env.DB.prepare(
			'DELETE FROM  client_users_session where sid =?'
		);
		await insert_stmt.bind(sessionId).run();
	}

	// 清除 cookie
	cookies.set('session_id', '', {
		path: '/',
		expires: new Date(0), // 立即過期
		httpOnly: true,
		secure: true,
		sameSite: 'lax'
	});

	return new Response(JSON.stringify({ success: true }));
};
