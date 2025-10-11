import type { RequestHandler } from './$types';
import { hashPassword } from '$lib/server/auth';
import type { ClientUsers } from '$lib/server/schema/ClientUsers';
export const POST: RequestHandler = async ({ request, cookies, platform }) => {
	const { username, password, token } = await request.json();

	const stmt = await platform.env.DB.prepare('SELECT * FROM client_users WHERE username = ?');
	const { results } = await stmt.bind(username).run();
	console.log(token);
	console.log(results);

	if (!Array.isArray(results) || results.length === 0) {
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });
	}
	try {
		const APIkey = await platform.env.turnstile_key.get();
		const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ secret: APIkey, response: token })
		});
		console.log(await res.json());
	} catch (error) {
		console.error('Turnstile validation error:', error);
		return { success: false, 'error-codes': ['internal-error'] };
	}

	const user = results[0] as ClientUsers;

	const passwordHash = await hashPassword(password);

	if (passwordHash !== user.password) {
		return new Response(JSON.stringify({ error: 'Invalid' }), { status: 401 });
	}
	const sessionId = crypto.randomUUID();
	cookies.set('session_id', sessionId, {
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 30
	});

	const insert_stmt = await platform.env.DB.prepare(
		'INSERT INTO client_users_session(sid, user_id,expires_at) VALUES (?, ?,DATETIME("now", "+30 minutes"))'
	);
	await insert_stmt.bind(sessionId, user.id).run();

	return new Response(JSON.stringify({ message: 'Login success' }));
};
