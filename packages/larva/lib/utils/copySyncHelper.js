const path = require( 'path' );
const fs = require( 'fs-extra' );
const chalk = require( 'chalk' );

/**
 * copySync Helper
 *
 * Wrap the fs.copySync funtion and provide useful logging.
 * See {@link https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md fs.copySync}.
 *
 * @param {string} src  Path of directory or file to copy.
 * @param {string} dest Path of destination for copied directory or file.
 */

module.exports = function copySyncHelper( src, dest ) {
	const name = path.basename( src );

	try {
		fs.copySync( src, dest );

		// eslint-disable-next-line no-console
		console.log( `Copied '${ name }'.` );
	} catch ( e ) {
		if ( 'ENOENT' === e.code ) {
			// eslint-disable-next-line no-console
			console.log(
				chalk.grey( `Can't find '${ name }' to copy, skipping.` )
			);
		} else {
			// eslint-disable-next-line no-console
			console.error( e );
		}
	}
};
