const clonedeep = require( 'lodash.clonedeep' );

const c_lazy_image = clonedeep(
	require( '../../components/c-lazy-image/c-lazy-image.prototype' )
);
const c_title = clonedeep(
	require( '../../components/c-title/c-title.prototype' )
);
const c_tagline = clonedeep(
	require( '../../components/c-tagline/c-tagline.prototype' )
);
const c_dek = clonedeep( require( '../../components/c-dek/c-dek.prototype' ) );
const o_social_list = clonedeep(
	require( '../../objects/o-social-list/o-social-list.prototype' )
);
const c_tagline_second = clonedeep( c_tagline );

c_lazy_image.c_lazy_image_classes = 'u-margin-lr-n10@mobile-max';
c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-4x3';

c_title.c_title_text = 'Debra and Leon Black';
c_title.c_title_classes =
	'lrv-u-font-family-primary lrv-u-text-transform-uppercase lrv-u-font-size-26@mobile-max lrv-u-font-size-36 lrv-u-color-black';
c_title.c_title_url = false;
c_title.c_title_link_classes = 'lrv-u-color-black';

c_tagline.c_tagline_text = 'New York';
c_tagline.c_tagline_classes =
	'lrv-u-margin-tb-00 lrv-u-font-family-primary lrv-u-font-size-22@mobile-max lrv-u-font-size-24';

c_tagline_second.c_tagline_text = 'Investment Banking';
c_tagline_second.c_tagline_classes =
	'lrv-u-margin-tb-00 lrv-u-font-size-22@mobile-max lrv-u-font-size-24 lrv-u-font-family-primary lrv-u-display-block';

c_dek.c_dek_text =
	'Massa tincidunt dui ut ornare lectus sit. Dolor purus non enim praesent elementum facilisis leo. Aliquet eget sit amet tellus cras adipiscing enim eu. ';
c_dek.c_dek_classes = 'lrv-u-font-size-20 lrv-u-font-style-italic';

o_social_list.o_social_list_classes += ' lrv-u-flex';

// eslint-disable-next-line array-callback-return
o_social_list.o_social_list_icons.map( ( social_icon ) => {
	social_icon.c_icon_link_classes +=
		' lrv-u-border-a-1 lrv-u-color-black lrv-u-border-color-grey';
} );

module.exports = {
	profile_blurb_classes: 'lrv-u-flex lrv-u-flex-direction-column@mobile-max',
	profile_blurb_image_classes: 'lrv-u-flex-shrink-0 lrv-u-margin-r-1@tablet',
	profile_blurb_detail_classes: '',
	profile_blurb_c_button_classes: '',
	c_button: false,
	c_lazy_image,
	c_title,
	c_tagline,
	c_tagline_second,
	c_dek,
	o_social_list,
};
