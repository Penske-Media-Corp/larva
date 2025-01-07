const path = require( 'path' );
const getAppConfiguration = require( './getAppConfiguration' );
const getPatternVariants = require( './getPatternVariants' );
const getSubDirectoryNames = require( './getSubDirectoryNames' );
const getModuleNamesFromDirectory = require( './getModuleNamesFromDirectory' );

const config = getAppConfiguration( 'patterns' );

/**
 * Get All Patterns
 *
 * Given a directory contianing patterns in the Larva structure (components/object/modules/one-offs),
 * return an object representing all the pattern types, patterns, and their variants.
 *
 * @param {string} startPath - Path to look in for all patterns. Should be assets/src/patterns.
 * @return {Object} - Object representing all patterns and variants
 */

module.exports = function getAllPatternsObj( startPath ) {
	const patternDirs = getSubDirectoryNames( startPath );

	const obj = {};

	try {
		// eslint-disable-next-line array-callback-return
		patternDirs.map( ( patternType ) => {
			let patterns = [];
			obj[ patternType ] = {};

			// Modules can be ignored, which maybe is unecessary
			// but for now continue on that path.
			if ( 'modules' === patternType ) {
				patterns = getModuleNamesFromDirectory(
					startPath,
					config.ignoredModules
				);
			} else {
				patterns = getSubDirectoryNames(
					path.join( startPath, patternType )
				);
			}

			// eslint-disable-next-line array-callback-return
			patterns.map( ( pattern ) => {
				obj[ patternType ][ pattern ] = getPatternVariants(
					path.join( startPath, `${ patternType }/${ pattern }` )
				);
			} );
		} );
	} catch ( e ) {
		// eslint-disable-next-line no-console
		console.error( e );
	}

	return obj;
};
