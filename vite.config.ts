import react from '@vitejs/plugin-react';
import crypto from 'crypto';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(cfg => ({
	plugins: [react()],
	resolve: {
		alias: [{
			find: '~',
			replacement: path.resolve(__dirname, 'src'),
		}],
	},
	css: {
		modules: {
			generateScopedName: (cls, file, _css) => {
				if (cfg.command === 'serve') {
					const hash = crypto.createHash('sha1').update(file).digest('hex').substring(0, 5);
					const fname = path.basename(file).slice(0, -'.module.css'.length);
					return fname.substring(fname[0] === '+' ? 1 : 0) + '-' + cls + '-' + hash;
				} else {
					return '_' + crypto.createHash('sha1').update(file + '__' + cls).digest('hex').substring(0, 10);
				}
			},
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
}));
