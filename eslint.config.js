import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import {defineConfig, globalIgnores} from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	globalIgnores(['build']),
	{
		files: ['**/*.{js,ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
			'@stylistic': stylistic,
		},
		rules: {
			'simple-import-sort/exports': 'warn',
			'simple-import-sort/imports': ['warn', {
				groups: [['^\\u0000', '^node:', '^react$', '^react-dom$', '^@?\\w', '^', '^\\.', '^.+\\.css$']],
			}],
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/comma-dangle': ['warn', 'always-multiline'],
			'@stylistic/comma-spacing': 'warn',
			'@stylistic/eol-last': 'warn',
			'@stylistic/function-call-spacing': ['warn', 'never'],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/jsx-curly-spacing': ['warn', {children: true}],
			'@stylistic/jsx-equals-spacing': 'warn',
			'@stylistic/jsx-quotes': ['warn', 'prefer-single'],
			'@stylistic/jsx-tag-spacing': ['warn', {beforeClosing: 'never'}],
			'@stylistic/key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'minimum'}],
			'@stylistic/keyword-spacing': 'warn',
			'@stylistic/member-delimiter-style': ['warn', {
				multiline: {delimiter: 'semi', requireLast: true},
				singleline: {delimiter: 'semi', requireLast: false},
			}],
			'@stylistic/no-extra-semi': 'warn',
			'@stylistic/no-multi-spaces': 'warn',
			'@stylistic/no-whitespace-before-property': 'warn',
			'@stylistic/object-curly-spacing': ['warn', 'never'],
			'@stylistic/padded-blocks': ['warn', {switches: 'never'}],
			'@stylistic/quotes': ['warn', 'single', {avoidEscape: true}],
			'@stylistic/semi': ['warn', 'always'],
			'@stylistic/space-before-blocks': ['warn'],
			'@stylistic/space-before-function-paren': ['warn', {anonymous: 'always', named: 'never'}],
			'@stylistic/space-infix-ops': 'warn',
			'@stylistic/template-curly-spacing': ['warn', 'never'],
			'@stylistic/type-annotation-spacing': ['warn'],
			'@typescript-eslint/no-unused-vars': ['warn', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_',
			}],
		},
	},
]);
