const clonedeep = require( 'lodash.clonedeep' );

const c_icon_prototype = require( '../../components/c-icon/c-icon.prototype' );
const social_share_primary_items = [ 'facebook', 'twitter', 'pinterest', 'tumblr' ];
const social_share_secondary_items = [ 'reddit', 'linkedin', 'print' ];

const social_share_primary = [];
const social_share_secondary = [];

for ( let i = 0; i < social_share_primary_items.length; i++ ) {
	social_share_primary.push( generateSocialShareItemWithUtiliti( social_share_primary_items[i] ) );
}

for ( let i = 0; i < social_share_secondary_items.length; i++ ) {
	social_share_secondary.push( generateSocialShareItemWithUtiliti( social_share_primary_items[i] ) );
}

const c_icon_plus = clonedeep( c_icon_prototype );
c_icon_plus.c_icon_link_classes = 'lrv-u-display-block lrv-u-display-inline-flex lrv-u-color-black';
c_icon_plus.c_icon_url = '#';
c_icon_plus.c_icon_rel_name = 'plus';
c_icon_plus.c_icon_name = 'plus';
c_icon_plus.c_icon_classes = 'lrv-u-width-16 lrv-u-height-16';

module.exports = {
	social_share_classes: '',
	social_share_prefix: false,
	social_share_prefix_classes: 'lrv-u-display-none@mobile-max lrv-u-color-grey lrv-u-font-size-10 lrv-u-text-transform-uppercase lrv-u-margin-r-1@tablet lrv-u-margin-b-050@mobile-max',
	social_share_prefix_text: 'Share',
	social_share_items_classes: 'lrv-a-space-children--1 lrv-a-space-children-horizontal',
	social_share_primary: social_share_primary,
	social_share_secondary: social_share_secondary,
	plus_icon: c_icon_plus
};

function generateSocialShareItemWithUtiliti( platform ) {
	let c_icon = clonedeep( c_icon_prototype );

	c_icon.c_icon_link_classes = 'lrv-a-unstyle-link lrv-u-display-block lrv-u-display-inline-flex';
	c_icon.c_icon_url = '#';
	c_icon.c_icon_rel_name = platform;
	c_icon.c_icon_name = platform;
	c_icon.c_icon_classes = 'lrv-u-width-16 lrv-u-height-16';

	return c_icon;
}
