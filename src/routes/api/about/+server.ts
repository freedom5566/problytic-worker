// import { json, error } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';

export async function GET({ platform }) {
	const { results } = await platform.env.DB.prepare('SELECT * FROM admin_user').run();
	return new Response(JSON.stringify(results));
}
