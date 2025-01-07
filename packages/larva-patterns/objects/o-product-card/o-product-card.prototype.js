const clonedeep = require( 'lodash.clonedeep' );

const c_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype.js' )
);
const c_button_prototype = require( '@penskemediacorp/larva-patterns/components/c-button/c-button.brand-basic.js' );
const c_tagline_prototype = require( '@penskemediacorp/larva-patterns/components/c-tagline/c-tagline.prototype.js' );
const c_lazy_image_prototype = require( '@penskemediacorp/larva-patterns/components/c-lazy-image/c-lazy-image.prototype.js' );
const c_dek = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-dek/c-dek.prototype.js' )
);

c_title.c_title_url = false;

const c_title_award = clonedeep( c_title );

const c_title_brand = clonedeep( c_title );
const c_lazy_image = clonedeep( c_lazy_image_prototype );
const c_tagline_product = clonedeep( c_tagline_prototype );
const c_button_buy = clonedeep( c_button_prototype );

c_dek.c_dek_classes =
	'lrv-u-padding-a-075 lrv-u-margin-tb-00 lrv-a-font-secondary-s';

const c_dek_verdict = clonedeep( c_dek );
const c_dek_pros = clonedeep( c_dek );
const c_dek_cons = clonedeep( c_dek );

c_title_award.c_title_classes =
	'lrv-u-color-white lrv-a-font-secondary-m lrv-u-border-a-2 lrv-u-padding-tb-050';

c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-1x1';

c_title_brand.c_title_text = 'Google';
c_title_brand.c_title_classes = 'lrv-u-padding-t-1 lrv-a-font-primary-m';
c_title_brand.c_title_link_classes = 'lrv-a-unstyle-link';

c_tagline_product.c_tagline_classes =
	'lrv-u-margin-tb-050 lrv-a-font-secondary-s';
c_tagline_product.c_tagline_text = 'Smart Thermostat For Home';

c_button_buy.c_button_text = 'Buy Now';
c_button_buy.c_button_classes =
	'lrv-u-cursor-pointer lrv-u-padding-tb-025 lrv-u-padding-lr-2 lrv-u-background-color-brand-primary lrv-u-color-black lrv-a-font-secondary-m lrv-u-text-transform-uppercase ';

module.exports = {
	o_product_card_classes: 'lrv-u-border-a-1',
	o_product_card_header_classes:
		'lrv-u-padding-a-025 lrv-u-text-align-center lrv-u-background-color-brand-secondary',
	o_product_card_details_classes:
		'lrv-u-text-align-center lrv-u-padding-tb-2 lrv-u-padding-lr-1 lrv-u-flex-grow-1',
	o_product_card_verdict_classes: 'lrv-u-flex',
	o_product_card_pros_classes: 'lrv-u-flex',
	o_product_card_cons_classes: 'lrv-u-flex',
	o_product_card_link_url: '#',
	o_product_card_link_classes: 'lrv-a-unstyle-link',
	c_title_award,
	c_title_brand,
	c_lazy_image,
	c_tagline_product,
	c_button_buy,
	c_dek_verdict,
	c_dek_pros,
	c_dek_cons,
};
