const clonedeep = require( 'lodash.clonedeep' );

const mega_menu_subscribe = clonedeep(
	require( '../mega-menu-footer-subscribe/mega-menu-footer-subscribe.prototype' )
);
const social_heading = clonedeep(
	require( '../../modules/heading/heading.prototype' )
);
const newsletter_heading = clonedeep(
	require( '../../modules/heading/heading.prototype' )
);
const o_social_list = clonedeep(
	require( '../../objects/o-social-list/o-social-list.prototype' )
);

social_heading.heading_level_text = '3';
social_heading.heading_classes =
	'lrv-a-font-body-xs lrv-u-margin-b-050 lrv-u-margin-t-025 lrv-u-font-weight-normal lrv-u-text-transform-uppercase lrv-u-text-align-center lrv-u-display-inline-block@mobile-max lrv-u-vertical-align-middle@mobile-max';
social_heading.heading_markup = 'Follow Us';

newsletter_heading.heading_level_text = '3';
newsletter_heading.heading_classes =
	'email-form-heading lrv-u-background-color-white lrv-a-font-body-xs lrv-u-width-70p lrv-u-margin-b-125 lrv-u-text-align-center lrv-u-font-weight-normal lrv-u-text-transform-uppercase lrv-u-padding-lr-075 lrv-u-border-r-1 lrv-u-border-l-1 lrv-u-border-r-00@mobile-max lrv-u-border-l-00@mobile-max';
newsletter_heading.heading_markup = 'Alerts & Newsletters';

const o_email_capture_form_prototype = require( '../../objects/o-email-capture-form/o-email-capture-form.prototype' );
const o_email_capture_form = clonedeep( o_email_capture_form_prototype );

o_email_capture_form.c_email_field.c_email_field_label_text = 'Email Address';
o_email_capture_form.c_email_field.c_email_field_input_placeholder_attr =
	'ENTER E-MAIL';
o_email_capture_form.c_email_field.c_email_field_input_classes =
	'lrv-u-width-100p';
o_email_capture_form.c_email_field.c_email_field_classes =
	'lrv-u-border-b-1 lrv-u-border-r-1 lrv-a-font-body-xxs lrv-u-margin-b-125 lrv-u-margin-b-00@mobile-max lrv-u-text-align-left lrv-u-width-75p@mobile-max';
o_email_capture_form.c_email_field.c_email_field_label_classes = 'lrv-a-hidden';
o_email_capture_form.o_email_capture_form_inner_classes =
	'lrv-u-text-align-right lrv-u-align-items-center';
o_email_capture_form.c_button.c_button_classes =
	'lrv-a-font-body-xs lrv-a-icon-after lrv-u-text-transform-uppercase lrv-a-unstyle-button lrv-u-cursor-pointer lrv-u-flex lrv-u-justify-content-end lrv-u-width-100p@tablet lrv-a-glue-parent@tablet lrv-u-width-75p@mobile-max';
o_email_capture_form.c_button.c_button_inner_classes =
	'lrv-u-background-color-white lrv-u-padding-l-050';
o_email_capture_form.c_button.c_button_text = 'Sign Up';

const c_tagline_prototype = require( '../../components/c-tagline/c-tagline.prototype' );
const c_tagline_terms = clonedeep( c_tagline_prototype );

c_tagline_terms.c_tagline_classes =
	'lrv-a-font-basic-xxs lrv-u-margin-t-050 lrv-a-children-link-decoration-underline';
c_tagline_terms.c_tagline_text = false;

module.exports = {
	o_email_capture_form,
	c_tagline_terms,
	o_social_list,
	social_heading,
	mega_menu_subscribe,
	newsletter_heading,
	mega_menu_footer_classes: 'lrv-u-border-t-2 lrv-u-background-color-white',
	mega_menu_footer_inner_classes:
		'lrv-u-flex lrv-u-flex-direction-column@mobile-max',
	mega_menu_footer_subscribe_classes:
		'lrv-u-flex lrv-u-flex-direction-column@desktop-max lrv-u-align-items-center lrv-u-width-30p lrv-a-hidden@mobile-max lrv-u-border-r-6 lrv-u-margin-r-025',
	mega_menu_footer_social_classes:
		'lrv-u-flex lrv-u-flex-direction-column lrv-u-align-items-center lrv-u-padding-tb-050 lrv-u-width-20p lrv-u-width-100p@mobile-max lrv-u-border-r-1 lrv-u-border-l-1 lrv-u-border-r-00@mobile-max lrv-u-border-l-00@mobile-max lrv-u-padding-lr-050 lrv-u-display-block@mobile-max lrv-u-text-align-center@mobile-max lrv-u-border-b-2@mobile-max',
	mega_menu_social_list_classes:
		' lrv-u-display-inline-block@mobile-max lrv-u-vertical-align-middle@mobile-max lrv-u-flex@tablet lrv-u-justify-content-center',
	mega_menu_footer_form_classes:
		'lrv-u-flex lrv-u-flex-direction-column lrv-u-align-items-center lrv-u-padding-tb-1 lrv-u-width-50p lrv-u-width-100p@mobile-max lrv-u-flex-direction-column lrv-u-padding-lr-125',
};
