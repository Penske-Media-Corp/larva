module.exports = {
	maybeUseCliUrl: ( argv, configUrl ) => {
		if ( argv[ 4 ] && argv[ 4 ].includes( '--url=' ) ) {
			return argv[ 4 ].replace( '--url=', '' );
		}

		return configUrl;
	},

	/**
	 * Prepare Test Paths
	 *
	 * @param {Array} modules  array of module names e.g. [ 'footer', 'header', 'author' ]
	 * @param {Array} pmcPaths array of test paths e.g. [ '/', '/blog ]
	 */
	prepareTestPaths: ( modules, pmcPaths ) => {
		if ( modules && modules.length > 0 ) {
			return modules.map( ( a ) => '/modules/' + a );
		}

		if ( pmcPaths && pmcPaths.length > 0 ) {
			return pmcPaths;
		}

		// We are not testing patterns. Return array of paths from config.

		throw new Error(
			// eslint-disable-next-line no-undef
			chalk.red.bold(
				"Couldn't find configuration for larvaModukes or testPaths. Make sure those entries exist in the `backstop` object in larva.config.js"
			)
		);
	},

	/**
	 * Prepare Module Selectors
	 *
	 * Make a class selector out of each module from CLI, or return document.
	 *
	 * @param {Array} array of modules
	 */
	prepareTestSelectors: ( array ) => {
		// Test the whole document if there are no modules in the CLI
		if ( null === array ) {
			return [ 'document' ];
		}

		return array.map( ( a ) => '.' + a );
	},
};
