const clonedeep = require( 'lodash.clonedeep' );

const c_lazy_image = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-lazy-image/c-lazy-image.prototype' )
);
const c_link = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-link/c-link.prototype' )
);
const c_span = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-span/c-span.prototype' )
);
const c_title = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype' )
);
const c_dek = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-dek/c-dek.prototype' )
);

c_lazy_image.c_lazy_image_classes +=
	' lrv-u-border-radius-50p lrv-u-border-color-grey-light';

c_lazy_image.c_lazy_image_classes = 'lrv-u-border-radius-50p';
c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-1x1';
c_lazy_image.c_lazy_image_img_classes = 'lrv-u-border-radius-50p';
c_lazy_image.c_lazy_image_placeholder_url =
	'https://www.w3schools.com/howto/img_avatar2.png';
c_lazy_image.c_lazy_image_link_target_blank = true;
c_lazy_image.c_lazy_image_link_rel_attr =
	'noopener noreferrer nofollow sponsored';

c_title.c_title_text = 'John Doe';
c_title.c_title_classes =
	'lrv-a-font-primary-xl lrv-u-display-block lrv-u-margin-b-025';
c_title.c_title_url_target_attr = '_blank';
c_title.c_title_url_rel_attr = 'noopener noreferrer nofollow sponsored';
c_title.c_title_url_target_blank = true;

c_dek.c_dek_markup = 'Senior Editor';

c_span.c_span_classes = 'lrv-a-font-secondary-m';

c_title.c_title_classes = 'lrv-a-font-primary-s lrv-u-margin-t-050';
c_dek.c_dek_text = false;
c_span.c_span_link_classes =
	'lrv-a-unstyle-link lrv-u-text-decoration-none:hover';
c_link.c_link_classes =
	'lrv-a-font-body-l lrv-a-unstyle-link lrv-u-color-brand-secondary u-color-brand-primary-dark:hover';

module.exports = {
	authors_bio_classes:
		'lrv-u-flex lrv-u-flex-direction-column lrv-u-margin-tb-150',
	author_grid_primary_classes:
		'lrv-a-grid lrv-a-cols4@tablet lrv-a-cols6@mobile-max',
	author_grid_secondary_classes:
		'lrv-u-flex lrv-u-margin-t-1 lrv-u-margin-t-n4@tablet lrv-u-height-100p lrv-u-justify-content-end',
	author_desc_wrapper_classes:
		'lrv-u-flex-basis-75p@desktop lrv-u-padding-l-025 lrv-a-font-secondary-m',
	author_link_bottom_wrapper_classes:
		'lrv-u-flex lrv-u-order-100 lrv-u-margin-t-050',
	author_image_wrapper_classes: 'lrv-a-span1',
	author_title_wrapper_classes: 'lrv-a-span3@tablet a-span4@mobile-max',
	c_lazy_image,
	c_link,
	c_span,
	c_title,
	c_dek,
};
