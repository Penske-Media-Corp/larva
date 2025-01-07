const path = require( 'path' );

/**
 * Get Pattern Data
 *
 * @param {string} patternsPath
 * @param {Object} params       Object containing name of pattern
 */
function getPatternData( patternsPath, params ) {
	const variant = params.variant || 'prototype';
	const patternPath = path.join(
		patternsPath,
		params.type,
		params.name,
		params.name + '.' + variant + '.js'
	);

	try {
		return require( patternPath );
	} catch ( e ) {
		const originalError = e;

		try {
			const jsonPath = path.join(
				patternsPath,
				params.type,
				params.name,
				params.name + '.json'
			);

			// Backwards compat for Deadline when patterns were stored as JSON
			const patternData = require( jsonPath );
			return patternData;
		} catch {
			return {
				message: `Error getting data for "${ params.name }".<br>There is likely a problem with ${ params.name }.${ variant }.js.`,
				error: originalError,
			};
		}
	}
}

module.exports = getPatternData;
