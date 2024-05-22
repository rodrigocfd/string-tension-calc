module.exports = {
	root: true,
	env: {browser: true, es2020: true},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['build', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn', {allowConstantExport: true},
		],
		'array-bracket-spacing': ['warn', 'never'],
		'comma-dangle': ['warn', 'always-multiline'],
		'eqeqeq': ['warn', 'always'],
		'indent': ['warn', 'tab'],
		'jsx-quotes': ['warn', 'prefer-single'],
		'key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'minimum'}],
		'no-empty': 'warn',
		'no-sparse-arrays': 'error',
		'object-curly-spacing': ['warn', 'never'],
		'prefer-const': 'warn',
		'quotes': ['warn', 'single', {avoidEscape: true}],
		'semi': ['warn', 'always'],
		'template-curly-spacing': ['warn', 'never'],
		'@typescript-eslint/member-delimiter-style': ['warn', {
			multiline: {delimiter: 'semi', requireLast: true},
			singleline: {delimiter: 'semi', requireLast: false},
		}],
		'@typescript-eslint/no-unused-vars': ['warn', {
			'argsIgnorePattern': '^_',
			'varsIgnorePattern': '^_',
			'caughtErrorsIgnorePattern': '^_',
		}],
	},
};
