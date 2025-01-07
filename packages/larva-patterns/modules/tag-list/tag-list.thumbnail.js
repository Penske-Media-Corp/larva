const clonedeep = require( 'lodash.clonedeep' );
/**
 * Larva includes.
 */
const c_lazy_image = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-lazy-image/c-lazy-image.prototype.js' )
);
const tag_list = clonedeep(
	require( '@penskemediacorp/larva-patterns/modules/tag-list/tag-list.prototype' )
);

/* Update `c_span` styles and add thumbnail. */
const tag_list_terms = Array.from(
	tag_list.tag_list_terms,
	( term, index ) => ( {
		...term,
		c_span: {
			...term.c_span,
			c_span_text: term.c_span.c_span_text.replace( /,\s*$/, '' ),
			c_span_classes: [
				'a-truncate-ellipsis',
				'lrv-u-color-brand-secondary-dark',
				'lrv-u-display-block',
				'lrv-u-font-family-basic',
				'lrv-u-font-size-13',
				'lrv-u-text-align-center',
				'lrv-u-text-transform-uppercase',
			].join( ' ' ),
		},
		o_figure: {
			...term.o_figure,
			o_figure_classes: 'lrv-u-margin-b-050',
			c_lazy_image: {
				...c_lazy_image,
				c_lazy_image_img_classes:
					'lrv-u-background-color-grey-light lrv-u-border-radius-50p lrv-u-display-block lrv-u-height-auto',
				c_lazy_image_crop_class: 'lrv-a-crop-1x1',
				c_lazy_image_classes: 'lrv-u-margin-lr-auto',
				c_lazy_image_placeholder_url: `https://source.unsplash.com/random/200x200/#${ index }`,
			},
		},
	} )
);

module.exports = {
	...tag_list,
	tag_list_classes: [
		'lrv-a-cols2',
		'lrv-a-cols1@tablet',
		'lrv-a-cols3@desktop',
		'lrv-a-grid',
		'lrv-a-unstyle-list',
	].join( ' ' ),
	tag_list_term_classes:
		'lrv-u-align-items-center lrv-u-flex-direction-column lrv-u-flex-wrap-wrap lrv-u-flex',
	tag_list_term_item_classes:
		'lrv-u-margin-lr-auto lrv-u-width-150 lrv-u-max-width-100p',
	tag_list_terms,
};
