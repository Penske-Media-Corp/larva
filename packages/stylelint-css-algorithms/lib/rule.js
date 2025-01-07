const stylelint = require( 'stylelint' );

const ruleName = 'plugin/css-algorithms';
const isObject = ( o ) => typeof o === 'object';

const messages = {
	rejected: ( prop, algorithmName ) =>
		`The property '${ prop }' is not permitted in the algorithm '${ algorithmName }'.`,
};

module.exports = {
	name: ruleName,

	messages: stylelint.utils.ruleMessages( ruleName, messages ),

	rule( options ) {
		return function ( cssRoot, result ) {
			const validOptions = stylelint.utils.validateOptions(
				result,
				ruleName,
				{
					actual: options,
					possible: [ isObject ],
				}
			);

			if ( ! validOptions ) {
				// eslint-disable-next-line no-console
				console.error( 'Invalid options', validOptions );
			}

			// eslint-disable-next-line array-callback-return
			Object.keys( options ).map( function ( key ) {
				const selector = new RegExp( '^.' + key + '.*' );
				const allowedProperties = options[ key ];

				cssRoot.walkRules( selector, function ( ruleset ) {
					ruleset.walkDecls( function ( decl ) {
						if ( ! allowedProperties.includes( decl.prop ) ) {
							stylelint.utils.report( {
								ruleName,
								result,
								node: decl,
								message: `${ messages.rejected(
									decl.prop,
									key
								) } (${ ruleName })`,
							} );
						}
					} );
				} );
			} );
		};
	},
};
