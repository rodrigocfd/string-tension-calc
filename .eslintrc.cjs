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
			'warn',
			{allowConstantExport: true},
		],
		'array-bracket-spacing': [1, 'never'],
		indent: [1, 'tab'],
		'jsx-quotes': [1, 'prefer-single'],
		'object-curly-spacing': [1, 'never'],
		quotes: [1, 'single', {avoidEscape: true}],
		semi: [1, 'always'],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^_",
				"caughtErrorsIgnorePattern": "^_",
			},
		]
	},
};
