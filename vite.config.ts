import {defineConfig} from 'vite';
import {resolve} from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: [{
			find: '@',
			replacement: resolve(__dirname, 'src'),
		}],
	},
	base: '/string-tension-calc',
	server: {
		port: 8080,
	},
	build: {
		outDir: 'build',
	},
});
