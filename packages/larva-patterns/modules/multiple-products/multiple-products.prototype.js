const clonedeep = require( 'lodash.clonedeep' );

const c_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype' )
);
const multiple_products_item = clonedeep(
	require( '@penskemediacorp/larva-patterns/objects/o-multiple-product-item/o-multiple-product-item.prototype' )
);

c_title.c_title_classes =
	'lrv-u-text-align-center lrv-u-padding-tb-075 lrv-u-border-t-1 lrv-u-border-b-1 lrv-u-font-size-28';
c_title.c_title_text = 'Our Top Picks';

const multiple_products_items = [
	multiple_products_item,
	multiple_products_item,
	multiple_products_item,
];

module.exports = {
	c_title,
	multiple_products_items,
};
