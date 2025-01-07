const clonedeep = require( 'lodash.clonedeep' );

/**
 * Larva includes.
 */
const c_span = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-span/c-span.prototype' )
);

/* Generate a list of tag titles. */
const titles = [
	'Music',
	'Software Development',
	'Data Science',
	'Sustainable Agriculture',
	'Art',
	'Digital Marketing Strategies',
];

/**
 * Generate a list of `c_span` links.
 * For demo purposes, append commas to all items except last in array.
 */
const tag_list_terms = Array.from( titles, ( title, index ) => ( {
	c_span: {
		...c_span,
		c_span_classes: '',
		c_span_link_classes:
			'lrv-u-font-weight-bold lrv-u-color-black lrv-u-color-brand-primary:hover lrv-a-hover-effect',
		c_span_text: `${ title }${ index === titles.length - 1 ? '' : ',' }`,
		c_span_url: `#test-link-${ index + 1 }`,
	},
} ) );

module.exports = {
	tag_list_classes: [
		'lrv-a-unstyle-list',
		'lrv-u-display-inline-flex',
		'lrv-u-flex-wrap-wrap',
		'lrv-u-flex-direction-row',
	].join( ' ' ),
	tag_list_term_item_classes: 'lrv-u-margin-r-025',
	tag_list_term_classes: '',
	tag_list_terms,
};
