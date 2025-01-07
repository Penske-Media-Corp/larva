const execPhp = require( 'exec-php' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const getAppConfiguration = require( './lib/getConfig' );
const config = getAppConfiguration( 'parser' );

/**
 * Twig to PHP Parser
 *
 * @param {Object} config Optional object containing configuration. See the
 *                        package README for supported configuration.
 */

function twigToPhpParser( thisConfig = {} ) {
	// TODO: We need some kind of wrapper here for config...or better:
	// move this to pmc-plugins/pmc-larva and scrap this awkward JS
	// execPhp wrapper situation, and use Larva\Config for this config.
	let twigDir = path.join( process.cwd(), './src/patterns' );
	let phpDir = path.join( process.cwd(), '../template-parts/patterns' );
	let isUsingPlugin = false;

	if ( 'undefined' !== typeof thisConfig.twigDir ) {
		if ( thisConfig.twigDir.startsWith( '.' ) ) {
			twigDir = path.join( process.cwd(), thisConfig.twigDir );
		} else {
			twigDir = thisConfig.twigDir;
		}
	} else if ( 'undefined' !== typeof thisConfig.relativeSrcOverride ) {
		if ( thisConfig.relativeSrcOverride.startsWith( '/' ) ) {
			twigDir = thisConfig.relativeSrcOverride;
		} else {
			twigDir = path.join(
				process.cwd(),
				thisConfig.relativeSrcOverride
			);
		}
	}

	if ( 'undefined' !== typeof thisConfig.isUsingPlugin ) {
		isUsingPlugin = thisConfig.isUsingPlugin;
	}

	if ( 'undefined' !== typeof thisConfig.phpDir ) {
		phpDir = thisConfig.phpDir;
	}

	return new Promise( ( resolve, reject ) => {
		execPhp(
			path.resolve( __dirname, './lib/twig-to-php-parser.php' ),
			thisConfig.phpBinaryPath,
			function ( error, php ) {
				if ( error ) {
					reject( error );
				}

				php.twig_to_php_parser(
					twigDir,
					phpDir,
					isUsingPlugin,
					function ( thisError, result ) {
						if ( thisError ) {
							reject( thisError );
						}

						resolve( result );
					}
				);
			}
		);
	} );
}

function parseIncludePath(
	twigIncludeStr,
	patternName,
	dataName,
	isUsingPlugin = false
) {
	return new Promise( ( resolve, reject ) => {
		execPhp(
			path.resolve( __dirname, './lib/twig-to-php-parser.php' ),
			config.phpBinaryPath,
			function ( error, php ) {
				if ( error ) {
					reject( error );
				}

				php.parse_include_path(
					twigIncludeStr,
					patternName,
					dataName,
					isUsingPlugin,
					function ( thisError, result ) {
						if ( thisError ) {
							reject( thisError );
						}

						resolve( result );
					}
				);
			}
		);
	} );
}

function parseSvgPath( twigSvgIncludeStr, svgName, isUsingPlugin = false ) {
	return new Promise( ( resolve, reject ) => {
		execPhp(
			path.resolve( __dirname, './lib/twig-to-php-parser.php' ),
			config.phpBinaryPath,
			function ( error, php ) {
				if ( error ) {
					reject( error );
				}

				php.parse_svg_path(
					twigSvgIncludeStr,
					svgName,
					isUsingPlugin,
					function ( thisError, result ) {
						if ( thisError ) {
							reject( thisError );
						}

						resolve( result );
					}
				);
			}
		);
	} );
}

function parseWpAction( twigMarkup ) {
	return new Promise( ( resolve, reject ) => {
		execPhp(
			path.resolve( __dirname, './lib/twig-to-php-parser.php' ),
			config.phpBinaryPath,
			function ( error, php ) {
				if ( error ) {
					reject( error );
				}

				php.parse_wp_action(
					twigMarkup,
					function ( thisError, result ) {
						if ( thisError ) {
							reject( thisError );
						}

						resolve( result );
					}
				);
			}
		);
	} );
}

module.exports = {
	twigToPhpParser,
	methods: {
		parseIncludePath,
		parseSvgPath,
		parseWpAction,
	},
	run: () => {
		twigToPhpParser( config )
			// eslint-disable-next-line no-console
			.catch( ( e ) => console.log( e ) ) // PHP errors
			.then( () =>
				// eslint-disable-next-line no-console
				console.log(
					chalk.green( 'Completed parsing Twig templates to PHP.' )
				)
			)
			// eslint-disable-next-line no-console
			.catch( ( e ) => console.log( e ) );
	},
};
