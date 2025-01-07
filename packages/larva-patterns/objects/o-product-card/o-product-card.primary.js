const clonedeep = require( 'lodash.clonedeep' );

const o_product_card = clonedeep( require( './o-product-card.prototype' ) );

o_product_card.o_product_card_classes =
	'o-product-card--primary lrv-u-border-a-1@mobile-max lrv-u-border-color-grey-light lrv-u-width-100p';
o_product_card.o_product_card_header_classes =
	'lrv-u-padding-a-025 lrv-u-text-align-center lrv-u-background-color-brand-primary';
o_product_card.c_title_award.c_title_classes =
	'lrv-u-border-a-2 lrv-a-font-secondary-m lrv-u-padding-tb-050';

module.exports = o_product_card;
