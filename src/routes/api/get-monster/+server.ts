import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	const stmt = await platform.env.DB.prepare('SELECT * FROM artale_monsters ');
	const { results } = await stmt.bind().run();

	if (!Array.isArray(results) || results.length === 0) {
		return new Response(JSON.stringify({ message: 'not found' }), { status: 401 });
	}

	return new Response(JSON.stringify({ message: 'OK', datas: results }));
};
