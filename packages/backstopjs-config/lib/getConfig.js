const chalk = require( 'chalk' );
const path = require( 'path' );

/**
 * Get Larva Configuration.
 *
 * Find larva.config.js according to the current working directory.
 * For consuming projects, this will be theme/assets/, and for the
 * mono-repo, it will be packages/larva.
 *
 * For test env, the CWD is overridden to the local directory for fixtures.
 * (this is a problem for writing project-level tests, but for a later time.)
 *
 * Note that this is copied from packages/larva/lib in order to
 * remove dependency.
 *
 * @param tool string that indicates a specific configuration property, e.g. patterns.
 *
 * @return value of the specified key.
 */

module.exports = function getAppConfiguration( key ) {
	try {
		let appRoot = process.cwd();

		if ( 'test' === process.env.NODE_ENV ) {
			appRoot = path.join( __dirname, '../__tests__/fixtures' );
		}

		const config = require( `${ appRoot }/larva.config.js` )[ key ];

		if ( undefined === config ) {
			throw new Error(
				`Configuration for \`${ key }\` is required in larva.config.js. \nPlease refer to the Larva's docs for adding configuration: https://github.com/penske-media-corp/pmc-larva`
			);
		}

		return config;
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error(
			chalk.red(
				chalk.bold(
					'There is no larva.config.js in this directory.\n'
				) + error
			)
		);
	}
};
