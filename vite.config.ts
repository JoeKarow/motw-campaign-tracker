import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	server: { allowedHosts: ['.discordsays.com', 'motw.jk3.me'], host: '0.0.0.0' },
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
});
