const clonedeep = require( 'lodash.clonedeep' );

/**
 * Larva includes.
 */
const c_dek = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-dek/c-dek.prototype' )
);
const tag_list = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/tag-list/tag-list.prototype' )
);

c_dek.c_dek_markup =
	'Term Content. <em>Rich text</em> <strong>is</strong> <a href="#">supported</a>.';
c_dek.c_dek_text = '';

module.exports = {
	fact_list_item_classes: [
		'lrv-a-cols2@tablet',
		'lrv-u-border-b-1',
		'lrv-u-border-color-grey-light',
		'lrv-u-margin-b-1',
		'lrv-u-padding-b-1',
		'lrv-a-term-content-grid__fact-list-item',
	].join( ' ' ),
	fact_list_item_dd_classes:
		'lrv-u-margin-l-00 lrv-a-term-content-grid__fact-list-dd',
	fact_list_item_dd_data_attributes:
		'itemprop=Thing itemtype=http://schema.org/Thing',
	fact_list_item_dd_content: {
		...c_dek,
		c_dek_classes: 'lrv-u-margin-tb-00 lrv-u-display-block',
	},
	fact_list_item_tag_list: tag_list,
	fact_list_item_dd_terms_classes: '',
	fact_list_item_dt_classes:
		'lrv-u-font-weight-bold lrv-a-term-content-grid__fact-list-dt',
	fact_list_item_dt_text: 'Term Title',
};
