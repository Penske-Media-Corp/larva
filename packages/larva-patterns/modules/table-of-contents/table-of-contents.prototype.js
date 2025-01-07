const clonedeep = require( 'lodash.clonedeep' );

const c_heading = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-heading/c-heading.prototype' )
);
const c_nav_link = clonedeep(
	require( '@penskemediacorp/larva-patterns/components/c-nav-link/c-nav-link.prototype' )
);

c_heading.c_heading_classes =
	'lrv-a-font-primary-l u-font-size-25 lrv-u-padding-b-075 lrv-u-border-b-1';

c_nav_link.c_nav_link_markup = 'Moon Landing on July 21,1968';
c_nav_link.c_nav_link_title_attr = 'Moon Landing on July 21,1968';
c_nav_link.c_nav_link_url = '#';
c_nav_link.c_nav_link_text = false;

const toc_list_items = [
	c_nav_link,
	c_nav_link,
	c_nav_link,
	c_nav_link,
	c_nav_link,
];

const toc_mobile_list_items = toc_list_items;

module.exports = {
	toc_classes: 'lrv-u-border-a-1 lrv-u-padding-a-1 lrv-u-margin-b-1',
	toc_navigation_classes: 'lrv-js-MobileHeightToggle',
	toc_list_classes:
		'lrv-js-MobileHeightToggle-target lrv-u-color-brand-secondary a-font-theme-secondary-medium-xs lrv-a-unstyle-list lrv-a-grid lrv-a-cols2@desktop u-grid-row-gap-0 u-grid-gap-1 lrv-u-padding-t-050',
	toc_mobile_list_classes:
		'lrv-a-hidden@desktop lrv-u-color-brand-secondary a-font-theme-secondary-medium-xs lrv-a-unstyle-list lrv-a-grid  u-grid-row-gap-0 lrv-u-padding-t-050',
	toc_list_item_outer_classes: 'lrv-u-line-height-large lrv-u-width-100p',
	toc_mobile_list_item_outer_classes:
		'lrv-u-line-height-large lrv-u-width-100p',
	toc_navigation_anchor_classes:
		'lrv-u-display-block lrv-u-whitespace-nowrap lrv-u-overflow-hidden',
	nav_title_text: 'View More',
	nav_title_outer_classes:
		'lrv-a-hidden@desktop a-heading-border lrv-u-text-align-center',
	nav_title_classes:
		'lrv-js-MobileHeightToggle-trigger lrv-u-background-color-white lrv-u-font-weight-normal lrv-u-padding-a-050 lrv-u-justify-content-center lrv-u-text-transform-capitalize',
	toc_list_items,
	c_heading,
	toc_mobile_list_items,
};
