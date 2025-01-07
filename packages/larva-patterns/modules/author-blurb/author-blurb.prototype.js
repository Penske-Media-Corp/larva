const clonedeep = require( 'lodash.clonedeep' );

const c_lazy_image_prototype = require( '../../components/c-lazy-image/c-lazy-image.prototype' );
const c_heading_prototype = require( '../../components/c-heading/c-heading.prototype' );
const c_title_prototype = require( '../../components/c-title/c-title.prototype' );
const c_tagline_prototype = require( '../../components/c-tagline/c-tagline.prototype' );
const o_social_list_prototype = require( '../../objects/o-social-list/o-social-list.prototype' );
const c_icon_prototype = require( '../../components/c-icon/c-icon.prototype' );

const c_lazy_image = clonedeep( c_lazy_image_prototype );
const c_heading = clonedeep( c_heading_prototype );
const c_title = clonedeep( c_title_prototype );
const c_tagline = clonedeep( c_tagline_prototype );
const o_social_list = clonedeep( o_social_list_prototype );

c_lazy_image.c_lazy_image_classes += ' lrv-u-width-200';
c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-1x1';

c_heading.c_heading_classes =
	' lrv-u-font-family-secondary lrv-u-font-size-36@desktop lrv-u-font-weight-bold';
c_heading.c_heading_text = 'Mike Fleming Jr';

c_title.c_title_classes =
	'lrv-u-margin-b-1 lrv-u-font-family-primary lrv-u-font-weight-normal lrv-u-color-grey-dark lrv-u-font-size-14@mobile-max lrv-u-font-size-18 lrv-u-text-transform-uppercase';
c_title.c_title_text = 'Co-Editor-in-Chief, Film';
c_title.c_title_url = false;

c_tagline.c_tagline_classes +=
	' lrv-u-margin-a-00 lrv-u-padding-t-1 lrv-u-font-size-14 lrv-u-font-weight-light lrv-u-font-size-16 lrv-u-font-size-18@desktop-xl ';
c_tagline.c_tagline_text =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At quis risus sed vulputate odio ut enim blandit. Aliquam sem et tortor consequat id. Convallis aenean et tortor at risus viverra. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Id aliquet lectus proin nibh nisl. Id diam maecenas ultricies mi. Luctus venenatis lectus magna fringilla urna porttitor rhoncus.';

o_social_list.o_social_list_classes += ' lrv-u-flex';

const socialPlatforms = require( '../../utils/getSocialPlatforms' )( [
	'instagram',
	'twitter',
	'facebook',
	'youtube',
] );
const o_social_list_icons = [];

socialPlatforms.forEach( ( { name, label } ) => {
	const c_icon = clonedeep( c_icon_prototype );

	c_icon.c_icon_name = name;
	c_icon.c_icon_link_classes +=
		' lrv-u-display-block lrv-u-border-radius-50p lrv-u-padding-a-025 lrv-u-color-grey lrv-u-background-color-white lrv-u-color-grey-dark:hover lrv-u-margin-r-1';
	c_icon.c_icon_url = '#';
	c_icon.c_icon_screen_reader_text = label;
	c_icon.c_icon_screen_reader_title_attr = label;

	o_social_list_icons.push( c_icon );
} );

o_social_list.o_social_list_icons = o_social_list_icons;

module.exports = {
	c_lazy_image,
	c_heading,
	c_title,
	o_social_list,
	c_tagline,
	author_blurb_classes: 'lrv-u-margin-b-2 lrv-u-flex lrv-u-flex-wrap-wrap',
	author_blurb_image_classes: 'lrv-u-margin-r-1',
	author_blurb_details_classes: '',
	author_blurb_text_classes: '',
};
