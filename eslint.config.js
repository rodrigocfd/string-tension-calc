import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import valtio from 'eslint-plugin-valtio';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ignores: ['build']},
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{js,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'react': react,
			'simple-import-sort': simpleImportSort,
			'valtio': valtio,
			'@stylistic': stylistic,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...valtio.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],

			'eqeqeq': ['warn', 'always'],
			'no-empty': 'warn',
			'no-sparse-arrays': 'error',
			'prefer-const': 'warn',
			'react/jsx-key': 'error',
			'simple-import-sort/exports': 'warn',
			'simple-import-sort/imports': ['warn', {
				groups: [['^\\u0000', '^node:', '^react$', '^react-dom$', '^@?\\w', '^', '^\\.', '^.+\\.css$']],
			}],
			'valtio/state-snapshot-rule': 'error',
			'@stylistic/array-bracket-spacing': ['warn', 'never'],
			'@stylistic/comma-dangle': ['warn', 'always-multiline'],
			'@stylistic/comma-spacing': 'warn',
			'@stylistic/eol-last': 'warn',
			'@stylistic/function-call-spacing': ['warn', 'never'],
			'@stylistic/indent': ['warn', 'tab'],
			'@stylistic/jsx-curly-spacing': ['warn', {children: true}],
			'@stylistic/jsx-equals-spacing': 'warn',
			'@stylistic/jsx-props-no-multi-spaces': 'warn',
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
);
