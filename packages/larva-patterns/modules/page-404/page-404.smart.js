const clonedeep = require( 'lodash.clonedeep' );

const c_heading_prototype = require( '@penskemediacorp/larva-patterns/components/c-heading/c-heading.prototype' );
const c_svg_prototype = require( '../../components/c-svg/c-svg.prototype.js' );
const c_title_prototype = require( '@penskemediacorp/larva-patterns/components/c-title/c-title.prototype' );
const c_tagline_prototype = require( '@penskemediacorp/larva-patterns/components/c-tagline/c-tagline.prototype' );
const suggested_link_items_prototype = require( '@penskemediacorp/larva-patterns/modules/list/list.prototype' );
const search_form_prototype = require( '@penskemediacorp/larva-patterns/modules/search-form/search-form.prototype' );

const c_heading = clonedeep( c_heading_prototype );
const c_suggestion_title = clonedeep( c_title_prototype );
const c_search_title = clonedeep( c_title_prototype );
const c_svg = clonedeep( c_svg_prototype );
const c_title = clonedeep( c_title_prototype );
const c_tagline = clonedeep( c_tagline_prototype );
const suggested_link_items = clonedeep( suggested_link_items_prototype );
const search_form = clonedeep( search_form_prototype );

c_heading.c_heading_classes = 'lrv-a-screen-reader-only';
c_heading.c_heading_is_primary_heading = true;
c_heading.c_heading_text = '404';

c_svg.c_svg_name = 'logo-404';
c_svg.c_svg_classes = 'lrv-u-max-width-100p';

c_title.c_title_text = 'OOPS! Something went wrong here!';
c_title.c_title_classes =
	'lrv-a-font-secondary-l lrv-u-text-transform-uppercase lrv-u-margin-b-125';
c_title.c_title_url = false;

c_suggestion_title.c_title_classes = 'lrv-u-text-align-left lrv-u-margin-b-075';
c_suggestion_title.c_title_text =
	'Here are some suggestions that might be the page you were looking for:';
c_suggestion_title.c_title_url = false;

suggested_link_items.list_classes = 'lrv-u-text-align-left lrv-u-padding-b-1';
suggested_link_items.list_items = [
	{ list_markup: 'item_one' },
	{ list_markup: 'item_two' },
];

c_search_title.c_title_classes = 'lrv-u-text-align-left';
c_search_title.c_title_text = 'Or try searching for it here...';
c_search_title.c_title_url = false;

search_form.search_form_classes =
	'lrv-u-text-align-left lrv-u-margin-t-1 lrv-u-display-inline-flex lrv-u-width-100p search-form-404';
search_form.search_form_input_classes = 'lrv-u-border-a-1 lrv-u-width-100p';
search_form.search_form_action_url = '/?s=';

module.exports = {
	c_heading,
	c_suggestion_title,
	c_search_title,
	c_svg,
	c_tagline,
	c_title,
	page_404_inner_classes: 'lrv-u-margin-lr-auto lrv-u-padding-lr-1',
	search_form,
	suggested_link_items,
	wrapper_classes:
		'lrv-u-text-align-center lrv-u-padding-t-1 lrv-u-padding-b-2 lrv-u-margin-b-2 lrv-u-max-width-830 lrv-u-margin-lr-auto',
};
