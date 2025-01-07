const clonedeep = require( 'lodash.clonedeep' );

const c_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype' )
);

const c_dek = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-dek/c-dek.prototype' )
);

const faq_item = clonedeep(
	require( '@penskemediacorp/larva-patterns/objects/o-faq-item/o-faq-item.prototype' )
);

c_title.c_title_classes =
	'lrv-u-text-align-center lrv-u-padding-tb-075 lrv-u-border-t-1 lrv-u-border-b-1';
c_title.c_title_url = '';
c_dek.c_dek_classes = 'lrv-u-padding-b-150 lrv-u-margin-t-150 lrv-u-border-b-1';

const faq_items = [ faq_item, faq_item, faq_item, faq_item ];

module.exports = {
	c_title,
	c_dek,
	faq_items,
};
