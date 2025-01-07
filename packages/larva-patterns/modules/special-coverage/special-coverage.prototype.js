const clonedeep = require( 'lodash.clonedeep' );

const story_card = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/story/story.vertical' )
);
const c_heading = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-heading/c-heading.prototype' )
);
const c_lazy_image = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-lazy-image/c-lazy-image.prototype.js' )
);

c_heading.c_heading_classes +=
	' a-font-theme-primary-s lrv-u-font-size-32@desktop lrv-u-font-size-28 lrv-u-line-height-small lrv-u-text-transform-uppercase lrv-u-line-height-small';

const heading_1 = clonedeep( c_heading );
const heading_2 = clonedeep( c_heading );

heading_1.c_heading_text = 'Rolling Stone';
heading_1.c_heading_classes += ' lrv-u-color-brand-primary';

heading_2.c_heading_text = 'Reports';

c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-5x1';

story_card.story_classes +=
	' lrv-u-padding-lr-2@desktop-xl lrv-u-padding-lr-1@desktop lrv-u-padding-tb-125@mobile-max lrv-u-flex-basis-100p';
story_card.c_dek.c_dek_classes =
	'lrv-a-font-body-s lrv-a-hidden@mobile-max lrv-u-margin-a-00';
story_card.c_title.c_title_classes =
	'lrv-a-font-primary-xs lrv-u-display-block lrv-u-margin-b-050 ';
story_card.c_title.c_title_link_classes += ' lrv-a-truncate-ellipsis-5line';
story_card.story_grid_secondary_classes = 'lrv-a-span2';
story_card.story_links_classes +=
	' lrv-u-margin-tb-00@desktop lrv-u-margin-tb-00@mobile-max lrv-u-margin-t-1@desktop';
story_card.story_nav_classes = 'lrv-a-font-secondary-m';
story_card.story_grid_classes =
	'lrv-u-flex lrv-u-flex-direction-column@desktop';
story_card.story_grid_primary_classes =
	'lrv-u-flex-basis-50p@mobile-max lrv-u-margin-r-1@mobile-max';
story_card.story_grid_secondary_classes = 'lrv-u-flex-basis-50p@mobile-max';
story_card.c_span = false;
story_card.c_dek = false;
story_card.c_tagline_author = false;
story_card.c_timestamp = false;
story_card.c_link_bottom = false;

const special_coverage_items = [
	story_card,
	story_card,
	story_card,
	story_card,
];

module.exports = {
	special_coverage_wrapper_classes:
		'lrv-u-flex lrv-u-flex-direction-column@mobile-max lrv-u-padding-lr-150@mobile-max',
	special_coverage_banner_classes:
		'lrv-u-margin-r-2@desktop lrv-u-padding-tb-1 lrv-u-padding-tb-2@desktop lrv-u-flex-basis-15p@desktop',
	special_coverage_items_classes:
		' lrv-u-flex lrv-a-children-border-horizontal@desktop lrv-a-children-border-vertical@mobile-max lrv-u-flex-direction-column@mobile-max lrv-u-flex-basis-85p@desktop',
	special_coverage_heading_classes:
		'lrv-u-padding-b-150@desktop lrv-u-padding-b-125@mobile-max lrv-u-border-b-1',
	special_coverage_logo_classes:
		'lrv-u-padding-t-150@desktop lrv-u-padding-t-125@mobile-max',
	heading_1,
	heading_2,
	c_lazy_image,
	special_coverage_items,
};
