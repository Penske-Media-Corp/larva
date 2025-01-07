const clonedeep = require( 'lodash.clonedeep' );

const header_sticky_prototype = require( './header-sticky.prototype' );
const c_icon_prototype = require( '../../components/c-icon/c-icon.prototype' );
const read_next_prototype = require( '../read-next/read-next.prototype' );
const o_social_list_prototype = require( '../../objects/o-social-list/o-social-list.prototype' );

const read_next = clonedeep( read_next_prototype );
read_next.read_next_classes +=
	' lrv-u-margin-l-125 lrv-u-overflow-hidden lrv-u-margin-r-1';
read_next.c_span.c_span_text = 'Music';
read_next.c_span.c_span_classes =
	'lrv-u-whitespace-nowrap lrv-u-text-transform-uppercase lrv-a-font-body-m lrv-u-font-weight-700';
read_next.c_title.c_title_link_classes =
	'lrv-a-unstyle-link lrv-u-whitespace-nowrap lrv-a-font-body-m';

const o_social_list = clonedeep( o_social_list_prototype );

const socialPlatforms = require( '../../utils/getSocialPlatforms' )( [
	'facebook',
	'twitter',
	'email',
] );

const social_list_icons = [];
o_social_list.o_social_list_icons = [];
socialPlatforms.forEach( ( { name, label } ) => {
	const c_icon = clonedeep( c_icon_prototype );
	c_icon.c_icon_name = name;
	c_icon.c_icon_url = '#';
	c_icon.c_icon_link_classes +=
		'lrv-u-background-color-white lrv-u-border-radius-50p lrv-u-color-black lrv-u-color-brand-primary:hover lrv-u-display-block';
	c_icon.c_icon_rel_name = 'noopener noreferrer';
	c_icon.c_icon_screen_reader_text = label;
	c_icon.c_icon_screen_reader_title_attr = label;
	social_list_icons.push( c_icon );
} );
o_social_list.o_social_list_icons = social_list_icons;

const header_sticky = clonedeep( header_sticky_prototype );

header_sticky.o_social_list = o_social_list;
header_sticky.o_social_list.o_social_list_classes =
	' lrv-u-flex lrv-a-space-children--1 lrv-a-space-children-horizontal lrv-u-align-items-center lrv-a-unstyle-list  lrv-u-margin-l-auto lrv-u-margin-r-150';

header_sticky.expandable_search.expandable_search_classes +=
	' sticky-expandable';

header_sticky.read_next = read_next;

header_sticky.header_sticky_classes =
	'lrv-u-border-color-grey-light lrv-u-border-b-1 lrv-u-background-color-white lrv-u-width-100p u-box-shadow-medium article-sticky-header';
header_sticky.header_sticky_links_classes =
	'lrv-u-align-items-center lrv-u-flex lrv-u-justify-content-end lrv-u-width-21p';
header_sticky.header_sticky_logo_classes += ' lrv-u-order-n1';
header_sticky.header_sticky_icons_classes =
	'lrv-a-glue-parent lrv-u-align-items-center lrv-u-flex lrv-u-padding-r-1 lrv-u-border-r-1';

module.exports = header_sticky;
