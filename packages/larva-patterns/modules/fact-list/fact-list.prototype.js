const clonedeep = require( 'lodash.clonedeep' );

/**
 * Larva includes.
 */
const c_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype' )
);
const fact_list_item = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/fact-list-item/fact-list-item.prototype' )
);

c_title.c_title_classes = '';
c_title.c_title_text = 'Fact List';
c_title.c_title_id_attr = 'fact-list';
c_title.c_title_url = '';

module.exports = {
	c_title,
	fact_list_classes:
		'lrv-u-font-family-secondary lrv-u-margin-t-1 lrv-a-term-content-grid__tertiary',
	fact_list_data_attributes:
		'itemscope itemprop=Thing itemtype=http://schema.org/Thing',
	fact_list_dl_classes:
		'lrv-u-border-t-1 lrv-u-padding-t-1 lrv-u-margin-t-00 lrv-a-term-content-grid__fact-list',
	fact_list_items: [ fact_list_item ],
	fact_list_title_classes: 'lrv-u-margin-b-050 lrv-u-font-size-20',
};
