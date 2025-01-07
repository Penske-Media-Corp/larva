const fs = require( 'fs' );
const path = require( 'path' );

/**
 * Get Larva Configuration
 *
 * Find larva.config.js according to the current working directory.
 * For consuming projects, this will be theme/assets/, and for the
 * mono-repo, it will be packages/larva.
 *
 * For test env, the CWD is overridden to the local directory for fixtures.
 * (this is a problem for writing project-level tests, but for a later time.)
 *
 * @param {string}  key               string that indicates a specific configuration property, e.g. patterns.
 * @param {boolean} usePackageDefault fall back to package default if not defined in app
 *
 * @return value of the specified key.
 */

const defaultConfig = {
	eslint: {
		configFile: path.join(
			__dirname,
			'../../scripts/config/.eslintrc.json'
		),
	},

	webpack: {
		aliases: {
			'@js': path.resolve( './src/js' ),
			'@npm': path.resolve( './node_modules' ),
			'@larva-js': path.resolve(
				'./node_modules/@penskemediacorp/larva-js/src'
			),
		},
		entries: {
			'larva-ui': path.resolve( './entries/larva-ui.entry.js' ),
			common: path.resolve( './entries/common.entry.js' ),
		},
	},

	patterns: {
		larvaPatternsDir: path.resolve(
			'./node_modules/@penskemediacorp/larva-patterns'
		),
		projectPatternsDir: path.resolve( './src/patterns' ),
	},

	assets: {
		path: ( () => {
			// Fragile way to detect existing Larva sites
			if ( fs.existsSync( path.resolve( './build/css' ) ) ) {
				return path.resolve( './' );
			}

			return path.resolve( './node_modules/@penskemediacorp/larva' );
		} )(),
	},

	themeAssets: {},
};

module.exports = function getAppConfiguration( key, usePackageDefault = true ) {
	try {
		let appRoot = process.cwd();

		if ( 'test' === process.env.NODE_ENV ) {
			appRoot = path.join( __dirname, '../../__tests__/fixtures/' );
		}

		const config = require( `${ appRoot }/larva.config.js` );

		// If config not found in approot, fallback to package default in root
		if ( undefined === config[ key ] && usePackageDefault ) {
			return defaultConfig[ key ];
		}

		return config[ key ];
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.warn( 'Using default configuration. ' );

		return defaultConfig[ key ];
	}
};
