import {defineConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [[
					'babel-plugin-styled-components', {
						displayName: true,
						fileName: false
					},
				]],
			},
		}),
	],
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
