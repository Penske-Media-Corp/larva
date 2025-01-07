/**
 * Pattern Routes
 *
 * Given an object containing two levels of keys, the first for pattern types,
 * and the second for pattern names of that type with a value of an array
 * containing the variants - e.g.:
 *
 * {
 * 		components: {
 * 			'c-button': [ 'brand-basic', 'prototype' ]
 * 		},
 * 		objects: {
 * 			'o-nav': [ 'prototype' ]
 * 		}
 * }
 *
 * Return an array with routes for every pattern in the object.
 *
 * @param {Object} patternsObj - An object with two levels of keys where patternObj['components']['c-link'] is an array of c-link variants.
 * @return {Array} - An array of string routes e.g. [ '/components/c-link/', '/components/c-link/sponsored' ]
 */

const chalk = require( 'chalk' );

module.exports = function getPatternRoutes( patterns ) {
	let patternRoutes = [];

	try {
		patternRoutes = Object.keys( patterns )
			.map( ( type ) => {
				return Object.keys( patterns[ type ] )
					.map( ( name ) => {
						const path = `${ type }/${ name }`;

						if ( patterns[ type ][ name ].length > 1 ) {
							return patterns[ type ][ name ].map(
								( variant ) => {
									if ( 'prototype' !== variant ) {
										return path + '/' + variant;
									}
									return path;
								}
							);
						}
						return path;
					} )
					.flat();
			} )
			.flat();
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error(
			chalk.red(
				'Could not build the pattern routes. Is the pattern object structure correct?'
			),
			error
		);
	}

	return patternRoutes;
};
