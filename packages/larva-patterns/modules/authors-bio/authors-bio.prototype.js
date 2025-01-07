const clonedeep = require( 'lodash.clonedeep' );

const story_card = clonedeep(
	require( '../authors-bio-item/authors-bio-item.prototype' )
);

story_card.c_tagline_author = false;

story_card.c_lazy_image.c_lazy_image_classes +=
	' lrv-u-border-radius-50p lrv-u-border-color-grey-light';

story_card.c_lazy_image.c_lazy_image_classes = 'lrv-u-border-radius-50p';
story_card.c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-1x1';
story_card.c_lazy_image.c_lazy_image_img_classes = 'lrv-u-border-radius-50p';
story_card.c_lazy_image.c_lazy_image_placeholder_url =
	'https://www.w3schools.com/howto/img_avatar2.png';
story_card.c_lazy_image.c_lazy_image_link_target_blank = true;
story_card.c_lazy_image.c_lazy_image_link_rel_attr =
	'noopener noreferrer nofollow sponsored';

story_card.c_title.c_title_text = 'John Doe';
story_card.c_title.c_title_classes =
	'lrv-a-font-primary-xl lrv-u-display-block lrv-u-margin-b-025';
story_card.c_title.c_title_url_target_attr = '_blank';
story_card.c_title.c_title_url_rel_attr =
	'noopener noreferrer nofollow sponsored';
story_card.c_title.c_title_url_target_blank = true;

story_card.c_span.c_span_markup = 'Senior Editor';
story_card.c_span.c_span_classes =
	'a-font-theme-secondary-medium-xs lrv-u-display-block lrv-u-margin-b-025 lrv-u-margin-t-00 lrv-u-margin-b-4@tablet';

story_card.c_dek.c_dek_classes =
	'lrv-u-margin-t-00 lrv-u-margin-b-00 a-font-theme-secondary-light-l';
story_card.c_dek.c_dek_text = false;

module.exports = {
	authors_bio_wrapper_classes: ' lrv-u-border-t-2 lrv-u-padding-tb-1',
	author_items: [ story_card ],
	authors_bio_classes: 'lrv-a-grid lrv-a-cols5',
	author_grid_primary_classes: '',
	author_grid_secondary_classes:
		'a-span3 lrv-u-height-100p lrv-u-justify-content-center',
};
