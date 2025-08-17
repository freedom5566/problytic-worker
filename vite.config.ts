import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [tailwindcss(), sveltekit()],

		define: {
			__BASE_URL__: JSON.stringify(env.VITE_BASE_URL)
		}
	};
});
