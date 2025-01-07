const clonedeep = require( 'lodash.clonedeep' );

const c_icon = clonedeep(
	require( '../../components/c-icon/c-icon.prototype' )
);

const socialPlatforms = require( '../../utils/getSocialPlatforms' )( [
	'facebook',
	'twitter',
	'pinit',
	'tumblr',
	'reddit',
	'linkedin',
	'print',
] );

const social_share_primary = [];
const social_share_secondary = [];

const c_icon_struct = clonedeep( c_icon );
c_icon_struct.c_icon_link_classes =
	'lrv-a-unstyle-link lrv-u-display-block lrv-u-display-inline-flex';
c_icon_struct.c_icon_url = '#';
c_icon_struct.c_icon_classes = 'lrv-u-width-16 lrv-u-height-16';

for ( let i = 0; i < socialPlatforms.length; i++ ) {
	const c_icon_social = clonedeep( c_icon_struct );

	c_icon_social.c_icon_rel_name = socialPlatforms[ i ].name;
	c_icon_social.c_icon_name = socialPlatforms[ i ].name;
	c_icon_social.c_icon_screen_reader_text = socialPlatforms[ i ].label;
	c_icon_social.c_icon_screen_reader_title_attr = socialPlatforms[ i ].label;

	if ( 3 < i ) {
		social_share_primary.push( c_icon_social );
	} else {
		social_share_secondary.push( c_icon_social );
	}
}

const c_icon_plus = clonedeep( c_icon );
c_icon_plus.c_icon_link_classes = 'lrv-a-unstyle-button lrv-u-cursor-pointer';
c_icon_plus.c_icon_url = '';
c_icon_plus.c_icon_rel_name = 'plus';
c_icon_plus.c_icon_name = 'plus';
c_icon_plus.c_icon_classes = 'lrv-u-width-16 lrv-u-height-16';

module.exports = {
	social_share_classes: '',
	social_share_prefix: false,
	social_share_prefix_classes:
		'lrv-u-display-none@mobile-max lrv-u-color-grey lrv-u-font-size-10 lrv-u-text-transform-uppercase lrv-u-margin-r-1@tablet lrv-u-margin-b-050@mobile-max',
	social_share_prefix_text: 'Share',
	social_share_items_classes:
		'lrv-a-space-children--1 lrv-a-space-children-horizontal',
	social_share_primary,
	social_share_secondary,
	c_icon_plus,
};
