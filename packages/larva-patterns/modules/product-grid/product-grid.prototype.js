const clonedeep = require( 'lodash.clonedeep' );

const c_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype.js' )
);

const o_product_card = clonedeep(
	require( '../../objects/o-product-card/o-product-card.prototype' )
);

const o_product_card_primary = clonedeep(
	require( '../../objects/o-product-card/o-product-card.primary' )
);

const product_grid_header_verdict_text = 'Verdict';
const product_grid_header_pros_text = 'Pros';
const product_grid_header_cons_text = 'Cons';

o_product_card.o_product_card_classes =
	'lrv-u-border-a-1@mobile-max lrv-u-border-color-grey-light lrv-u-width-100p';
o_product_card.o_product_card_link_classes =
	'lrv-a-unstyle-link lrv-u-display-block lrv-a-children-border-vertical lrv-a-children-border--grey-light lrv-u-height-100p lrv-u-flex lrv-u-flex-direction-column';

o_product_card.product_grid_header_verdict_text =
	product_grid_header_verdict_text;
o_product_card.product_grid_header_pros_text = product_grid_header_pros_text;
o_product_card.product_grid_header_cons_text = product_grid_header_cons_text;

o_product_card_primary.o_product_card_classes +=
	' lrv-u-border-a-1@mobile-max lrv-u-border-color-grey-light';
o_product_card_primary.o_product_card_link_classes +=
	' lrv-a-unstyle-link lrv-u-display-block lrv-a-children-border-vertical lrv-a-children-border--grey-light lrv-u-height-100p lrv-u-flex lrv-u-flex-direction-column';

module.exports = {
	product_grid_classes:
		'lrv-u-margin-tb-2 lrv-u-flex@desktop lrv-a-children-border-horizontal lrv-a-children-border--grey-light lrv-u-border-a-1@desktop lrv-u-border-color-grey-light lrv-a-space-children--3 lrv-a-space-children-vertical@mobile-max',
	product_grid_items: [
		o_product_card,
		o_product_card_primary,
		o_product_card,
		o_product_card,
	],
	product_grid_header_verdict_text,
	product_grid_header_pros_text,
	product_grid_header_cons_text,
};
