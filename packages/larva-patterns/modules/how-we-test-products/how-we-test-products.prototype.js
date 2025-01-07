const clonedeep = require( 'lodash.clonedeep' );

const c_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype.js' )
);
const c_dek = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-dek/c-dek.prototype.js' )
);
const story_card = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/story/story.prototype.js' )
);

c_title.c_title_classes = 'lrv-a-font-primary-l lrv-u-color-black';
c_title.c_title_text = 'How We Test Products';
c_title.c_title_url = false;

c_dek.c_dek_classes = 'lrv-a-font-secondary-l';
c_dek.c_dek_markup =
	'Our journalists test hundreds of products every year for readers. We’ve developed a rigorous system for reviewing products objectively. Learn More ⇢.';
c_dek.c_dek_text = false;

story_card.c_span = false;
story_card.c_title.c_title_url = false;
story_card.c_title.c_title_classes =
	'lrv-a-font-secondary-xl lrv-u-margin-b-050';
story_card.c_title.c_title_text = '500+';
story_card.c_timestamp = false;
story_card.c_tagline_author = false;

story_card.c_dek.c_dek_text = 'Products Tested';
story_card.c_dek.c_dek_classes =
	'lrv-u-margin-tb-00 lrv-u-font-family-primary lrv-u-font-size-16 lrv-u-color-brand-secondary';
story_card.c_dek.c_dek_markup = false;

story_card.story_classes =
	'lrv-u-width-50p@mobile-max lrv-u-border-color-grey-light lrv-u-padding-tb-125@mobile-max lrv-u-width-75p@tablet lrv-u-margin-lr-auto';
story_card.story_grid_classes =
	'lrv-u-flex lrv-u-flex-direction-column lrv-u-height-100p lrv-u-justify-content-space-between';

story_card.c_lazy_image.c_lazy_image_classes = 'lrv-u-margin-lr-auto';
story_card.c_lazy_image.c_lazy_image_crop_class = '';
story_card.c_lazy_image.c_lazy_image_img_classes = '';
story_card.c_lazy_image.c_lazy_image_placeholder_url =
	'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_z.jpg';

how_we_test_products_items = [ story_card, story_card, story_card, story_card ];

module.exports = {
	how_we_test_products_classes:
		'lrv-u-text-align-center lrv-u-background-color-grey-lightest lrv-u-margin-tb-2',
	how_we_test_products_outer_classes:
		'lrv-u-width-75p@tablet lrv-u-margin-lr-auto lrv-u-padding-a-2',
	how_we_test_products_banner_classes: '',
	how_we_test_products_title_classes: '',
	how_we_test_products_items_classes:
		'lrv-u-flex lrv-u-flex-wrap-wrap@mobile-max',
	how_we_test_products_items,
	c_title,
	c_dek,
};
