import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform, locals }) => {
	const user_id = locals.userId;
	if (user_id) {
		const { monsters_id, monsters_name, monsters_drop_id, monsters_drop_name, ref_number } =
			await request.json();

		const insert_stmt = await platform.env.DB.prepare(
			'INSERT INTO share_datas_stats(user_id, monsters_id,monsters_name,monsters_drop_id,monsters_drop_name,ref_number) VALUES (?, ?,?,?,?,?)'
		);
		await insert_stmt
			.bind(user_id, monsters_id, monsters_name, monsters_drop_id, monsters_drop_name, ref_number)
			.run();
		return new Response(JSON.stringify({ message: 'Register success' }), { status: 201 });
	}
	return new Response(JSON.stringify({ message: 'need login' }), { status: 404 });
};
