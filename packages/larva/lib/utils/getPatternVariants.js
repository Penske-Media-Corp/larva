/**
 * Return an array of "variants", or the pattern.XX.js from a
 * given directory.
 *
 * @param {string} startPath - the pattern directory to search.
 */

const fs = require( 'fs' );

// https://regex101.com/r/DgnTR4/2
const regex = new RegExp( '(.[^.]+).(.+).js$' );

module.exports = function getPatternVariants( startPath ) {
	// Only return Node prototype files that follow pattern name.XX.js
	// eslint-disable-next-line array-callback-return
	const files = fs.readdirSync( startPath ).filter( ( file ) => {
		if ( /.+\..*\.js$/.test( file ) ) {
			return file;
		}
	} );

	// Return array of the name of the variant e.g. XX in name.XX.js
	return files.map( ( file ) => file.match( regex )[ 2 ] );
};
