const clonedeep = require( 'lodash.clonedeep' );

/**
 * Larva includes.
 */
const c_tagline = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-tagline/c-tagline.prototype' )
);
const o_figure = clonedeep(
	require( '@penskemediacorp/larva-patterns/objects/o-figure/o-figure.prototype.js' )
);
const article_excerpt = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/article-excerpt/article-excerpt.prototype' )
);
const article_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/article-title/article-title.prototype' )
);
const fact_list = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/fact-list/fact-list.prototype' )
);
const fact_list_menu = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/fact-list-menu/fact-list-menu.prototype' )
);

// Configure page title.
article_title.article_title_markup = 'Kitchen Appliances';
article_title.article_title_classes = [
	'lrv-u-font-family-primary',
	'lrv-u-font-size-32',
	'lrv-u-font-size-46@tablet',
	'lrv-u-line-height-small',
	'lrv-u-margin-b-00',
	'lrv-u-padding-tb-075@tablet',
].join( ' ' );

// Configure tagline.
c_tagline.c_tagline_text = 'The best products for your kitchen';
c_tagline.c_tagline_classes = [
	'lrv-u-font-family-secondary',
	'lrv-u-font-size-18@mobile-max',
	'lrv-u-font-size-28',
	'lrv-u-margin-b-1',
	'lrv-u-margin-t-00',
].join( ' ' );
article_title.c_tagline = c_tagline;

// Begin configuring featured iamge.
o_figure.o_figure_classes =
	'lrv-u-font-family-secondary lrv-u-margin-b-00 lrv-u-width-100p lrv-a-term-content-grid__primary';
o_figure.c_lazy_image.c_lazy_image_placeholder_url =
	'https://source.unsplash.com/random/500x500';

// Configure featured image captions and credit.
o_figure.c_figcaption.c_figcaption_caption_markup = 'Caption text.';
o_figure.c_figcaption.c_figcaption_credit_text = 'Photo credit text.';
o_figure.c_figcaption.c_figcaption_caption_classes =
	'lrv-u-font-size-12 lrv-u-font-size-14@tablet';
o_figure.c_figcaption.c_figcaption_classes = [
	'lrv-u-flex',
	'lrv-u-flex-direction-column',
	'lrv-u-margin-t-050',
	'lrv-u-padding-b-1',
].join( ' ' );

o_figure.c_figcaption.c_figcaption_credit_classes = [
	'lrv-u-color-grey-dark',
	'lrv-u-font-family-basic',
	'lrv-u-font-size-10',
	'lrv-u-font-size-12@mobile-max',
	'lrv-u-line-height-large',
].join( ' ' );

article_excerpt.article_excerpt_markup =
	'We’ve spent hundreds of hours researching appliances, ' +
	'interviewing experts, poring over owner reviews, and testing appliances both large ' +
	'and small—many over the course of several years—to find the best appliances for your ' +
	'kitchen and home. From dishwashers and refrigerators to vacuums and steam cleaners, ' +
	'our experts pick out the right appliances for all kinds of living situations, to ' +
	'help keep your chores short and sweet.';

module.exports = {
	article_excerpt,
	article_title,
	fact_list_menu,
	fact_list,
	o_figure,
	term_content_top_classes: 'lrv-u-margin-t-1 lrv-a-term-content-grid',
	term_content_secondary_classes: 'lrv-a-term-content-grid__secondary',
};
