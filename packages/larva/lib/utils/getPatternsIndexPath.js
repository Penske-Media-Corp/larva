// We may need to fix this later? See comment below.
// eslint-disable-next-line no-unused-vars
const isCoreTheme = require( './isCoreTheme' );

module.exports = function getPatternsIndexPath( config ) {
	// TODO: add parent/child-esque logic for Larva patterns will occur i.e. the app
	// should look first in the theme, then in larvaPatternsDir.
	// if ( isCoreTheme( config ) ) {
	return config.larvaPatternsDir;
	// } else {
	// 	return config.projectPatternsDir;
	// }
};
