const clonedeep = require( 'lodash.clonedeep' );

/**
 * Module includes.
 */
const fact_item = clonedeep( require( './fact-list-item.prototype' ) );
const tag_list = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/tag-list/tag-list.thumbnail' )
);

fact_item.fact_list_item_tag_list = tag_list;

module.exports = {
	...fact_item,
};
