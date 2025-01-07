const path = require( 'path' );
const mkdirp = require( 'mkdirp' );
const fs = require( 'fs-extra' );
const chalk = require( 'chalk' );
const axios = require( 'axios' );

const getAppConfiguration = require( './utils/getAppConfiguration' );
const copySyncHelper = require( './utils/copySyncHelper' );

const assetsConfig = getAppConfiguration( 'assets' );
const themeAssetsConfig = getAppConfiguration( 'themeAssets' );

/**
 * Generate Static HTML
 *
 * Given an array of pattern routes from the Larva server and
 * a target build directory, use HTTP requests the get the HTML content
 * of each route, and write the content to directory structure that
 * mirrors the pattern routes.
 *
 * @param {Array}    routesArr An array of routes in a pattern server, excluding the pattern source (i.e. larva or project).
 *                             This is the result of getPatternRoutes.
 * @param {string}   buildPath A directory where the HTML files should be written.
 * @param {Function} done      A callback function to run when the site generation completes.
 * @param {string}   urlBase   The base URL for the pattern library e.g. 'http://localhost:3001/larva'.
 *                             Pattern routes will be appended to this. Should not end in slash.
 */

module.exports = function generateStatic(
	routesArr,
	buildPath,
	done,
	urlBase = 'http://localhost:3000/larva'
) {
	const errors = [];

	fs.mkdirpSync( buildPath );

	// Copy assets from assets/build and assets/public
	// to the static site build directory.
	// eslint-disable-next-line no-console
	console.log( '\nCopying assets...\n' );

	// assets/public dir contains fonts and non-built things.
	const publicAssetsSrc = ( () => {
		let pubPath = path.join( assetsConfig.path, `public` );

		// Fallback to assets in Larva
		if ( ! fs.existsSync( pubPath ) ) {
			pubPath = path.join( assetsConfig.path, 'public' );
		}

		return pubPath;
	} )();
	const publicAssetsDest = path.join( buildPath, '../assets/public' );

	const builtAssets = [ 'js', 'css', 'tokens', 'images', 'svg' ];

	builtAssets.forEach( ( item ) => {
		const dest = path.join( buildPath, `../assets/build/${ item }` );
		const src = path.join( assetsConfig.path, `build/${ item }` );

		copySyncHelper( src, dest );
	} );

	copySyncHelper( publicAssetsSrc, publicAssetsDest );

	const themeAssetKeys = Object.keys( themeAssetsConfig );

	themeAssetKeys.forEach( ( key ) => {
		const src = themeAssetsConfig[ key ];
		const dest = path.join( buildPath, `../assets/theme/${ key }` );

		copySyncHelper( src, dest );
	} );

	// Build the site.
	// Cycle through the list of routes and write the response
	// to files.
	// eslint-disable-next-line no-console
	console.log( '\nBuilding site...\n' );

	try {
		const promises = routesArr.map( ( route ) => {
			const dir = path.join( buildPath, route );
			const url = `${ urlBase }/${ route }`;

			return axios
				.get( url )
				.then( ( response ) => {
					if ( 200 === response.status ) {
						mkdirp.sync( dir );
						fs.writeFileSync(
							`${ dir }/index.html`,
							response.data
						);
						// eslint-disable-next-line no-console
						console.log( `Built ${ route }.` );
					}
				} )
				.catch( ( e ) => {
					if ( 'ECONNREFUSED' === e.code ) {
						process.exitCode = 1;
					} else {
						mkdirp.sync( dir );
						fs.writeFileSync( `${ dir }/index.html`, e.message );

						// eslint-disable-next-line no-console
						console.log(
							chalk.yellow(
								`Error writing ${ route }: ${ e.message }.`
							)
						);
					}
				} );
		} );

		axios
			.all( promises )
			.then( () => {
				if ( errors.length > 0 ) {
					// eslint-disable-next-line no-console
					console.log( errors );
				}

				done(
					chalk.green(
						`\nSite built to build/html/${ path.basename(
							buildPath
						) }. Check output for issues.\n`
					)
				);
			} )
			.catch( ( e ) => {
				done( chalk.bold.red( e ) );
			} );
	} catch ( e ) {
		// eslint-disable-next-line no-console
		console.error( e );
	}
};
