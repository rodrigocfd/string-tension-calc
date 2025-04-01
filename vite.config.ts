import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
		},
	},
	base: '/string-tension-calc',
	server: {
		port: 8080,
	},
	build: {
		outDir: 'build',
		chunkSizeWarningLimit: 1000,
	},
});
