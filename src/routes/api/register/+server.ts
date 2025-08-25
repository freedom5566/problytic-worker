import type { RequestHandler } from './$types';
import { hashPassword } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, platform }) => {
	const { username, password } = await request.json();

	if (!username || !password) {
		return new Response(JSON.stringify({ message: 'Username and password required' }), {
			status: 400
		});
	}

	// 檢查是否已存在
	const query_stmt = await platform.env.DB.prepare('SELECT * FROM client_users WHERE username = ?');
	const { results } = await query_stmt.bind(username).run();

	if (Array.isArray(results) && results.length > 0) {
		return new Response(JSON.stringify({ message: 'Username already exists' }), { status: 409 });
	}

	// hash 密碼
	const passwordHash = await hashPassword(password);

	// 寫入資料庫
	const insert_stmt = await platform.env.DB.prepare(
		'INSERT INTO client_users(username, password) VALUES (?, ?)'
	);
	await insert_stmt.bind(username, passwordHash).run();

	return new Response(JSON.stringify({ message: 'Register success' }), { status: 201 });
};
