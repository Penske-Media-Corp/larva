/**
 * Helper function to get larva-patterns/_data array by property
 *
 * @param {string} filename    JSON filenames in ../_data.
 * @param {string} orderKey    Object property name to sort/order by.
 * @param {Array}  orderValues Desired items from data file(s) (by orderKey property).
 */
module.exports = function ( filename, orderKey, orderValues ) {
	const data = require( `../_data/${ filename }.json` );

	if ( orderKey && orderValues ) {
		const sortedData = [];

		orderValues.forEach( ( orderValue ) => {
			sortedData.push(
				data.find( ( values ) => values[ orderKey ] === orderValue )
			);
		} );

		return sortedData;
	}
	return data;
};
