module.exports = {
	root: true,
	env: {browser: true, es2020: true},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'@vue/eslint-config-typescript',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	ignorePatterns: ['build', '.eslintrc.cjs'],
	plugins: ['vue'],
	rules: {
		indent: ['warn', 'tab'],
		quotes: ['warn', 'single', {avoidEscape: true}],
		semi: ['warn', 'always'],
		'array-bracket-spacing': ['warn', 'never'],
		'comma-dangle': ['warn', 'always-multiline'],
		'eqeqeq': ['warn', 'always'],
		'key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'strict'}],
		'no-empty': 'warn',
		'no-sparse-arrays': 'error',
		'object-curly-spacing': ['warn', 'never'],
		'prefer-const': 'warn',
		'template-curly-spacing': ['warn', 'never'],
		'vue/html-indent': ['warn', 'tab'],
		'vue/multi-word-component-names': 'off',
		'vue/mustache-interpolation-spacing': ['warn', 'never'],
		'vue/no-multi-spaces': 'warn',
		'vue/padding-line-between-blocks': ['warn', 'always'],
		'vue/v-on-event-hyphenation': ['warn', 'never'],
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
