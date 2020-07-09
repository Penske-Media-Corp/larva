const path = require( 'path' );
const fs = require( 'fs-extra' );
const chalk = require( 'chalk' );

/**
 * copySync Helper
 *
 * Wrap the fs.copySync funtion and provide useful logging.
 *
 * @param {string} src Path of directory or file to copy.
 * @param {string} dest Path of destination for copied directory or file.
 */

module.exports = function copySyncHelper( src, dest ) {

	const name = path.basename( src );

	try {
		fs.copySync( src, dest );

		console.log( `Copied '${name}'.` );
	} catch ( e ) {

		if ( 'ENOENT' === e.code ) {
			console.log( chalk.grey( `Can't find '${name}' to copy, skipping.` ) );
		} else {
			console.error( e );
		}

	}
}