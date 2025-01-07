/**
 * Get social platform information
 *
 * @param {Array} platforms "name" property values of desired platforms (see ../_data/social-platforms.json).
 */
module.exports = function ( platforms ) {
	return require( './getDataSet' )(
		'social-platforms',
		'name',
		undefined === platforms
			? [ 'instagram', 'pinit', 'twitter', 'facebook', 'youtube' ]
			: platforms
	);
};
