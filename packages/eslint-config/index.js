// This is used PMC-wide in other projects such as pmc-plugins, nova, larva, and other misc places where we want WordPress' eslint but with adjustments.

module.exports = {
	// env: {
	// 	jest: true
	// },
	// plugins: [
	// 	'jest',
	// ],
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:@wordpress/eslint-plugin/test-unit',
	],
	parser: '@babel/eslint-parser',
	overrides: [
		{
			files: [ '**/*.js' ],
			rules: {
				'jsdoc/require-returns-description': 'off',
				'jsdoc/check-line-alignment': 1,
			},
		},
	],
	root: true,
};
