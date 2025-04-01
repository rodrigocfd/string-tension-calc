import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import pluginTs from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{ts,vue}'],
	},
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	...pluginTs.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: pluginTs.parser,
			},
		},
	},
	{
		ignores: ['build/'],
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			'@stylistic': stylistic,
		},
		rules: {
			'array-bracket-spacing': ['warn', 'never'],
			'comma-dangle': ['warn', 'always-multiline'],
			'eqeqeq': ['warn', 'always'],
			'key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'minimum'}],
			'no-empty': 'warn',
			'no-sparse-arrays': 'error',
			'object-curly-spacing': ['warn', 'never'],
			'prefer-const': 'warn',
			'quotes': ['warn', 'single', {avoidEscape: true}],
			'semi': ['warn', 'always'],
			'template-curly-spacing': ['warn', 'never'],
			'simple-import-sort/exports': 'warn',
			'simple-import-sort/imports': ['warn', {
				groups: [
					['^\\u0000', '^node:', '^vue$', '^@?\\w', '^',
						'^~?\\w', '^\\.\\.', '^\\.\\..+\\.vue$', '^\\.', '^\\..+\\.vue$', '^.+\\.css$'],
				],
			}],
			'vue/html-indent': ['warn', 'tab'],
			'vue/multi-word-component-names': 'off',
			'vue/mustache-interpolation-spacing': ['warn', 'never'],
			'vue/no-multi-spaces': 'warn',
			'vue/padding-line-between-blocks': ['warn', 'always'],
			'vue/v-on-event-hyphenation': ['warn', 'never'],
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/comma-spacing': ['warn'],
			'@stylistic/function-call-spacing': ['warn', 'never'],
			'@stylistic/indent': ['warn', 'tab'],
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
			'@stylistic/space-before-blocks': ['warn'],
			'@stylistic/space-before-function-paren': ['warn', {anonymous: 'always', named: 'never'}],
			'@stylistic/space-infix-ops': ['warn'],
			'@stylistic/template-curly-spacing': ['warn', 'never'],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', {
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_',
			}],
		},
	},
];
