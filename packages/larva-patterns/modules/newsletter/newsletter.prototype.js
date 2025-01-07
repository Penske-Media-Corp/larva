const clonedeep = require( 'lodash.clonedeep' );

const c_title_prototype = require( '../../components/c-title/c-title.prototype' );
const c_title = clonedeep( c_title_prototype );

const c_logo_prototype = require( '../../components/c-logo/c-logo.prototype' );
const c_logo = clonedeep( c_logo_prototype );

const o_email_capture_form_prototype = require( '../../objects/o-email-capture-form/o-email-capture-form.prototype' );
const o_email_capture_form = clonedeep( o_email_capture_form_prototype );

const c_tagline_prototype = require( '../../components/c-tagline/c-tagline.prototype' );
const c_tagline = clonedeep( c_tagline_prototype );

const c_tagline_terms = clonedeep( c_tagline_prototype );

c_tagline.c_tagline_classes =
	'lrv-u-margin-t-1 lrv-u-margin-b-00 lrv-u-text-align-center lrv-u-font-size-20 lrv-u-line-height-small lrv-u-margin-b-2';
c_tagline.c_tagline_text = 'Sign Up for our Newsletters';

c_logo.c_logo_classes =
	'lrv-a-unstyle-link lrv-u-display-contents lrv-u-width-100p lrv-u-color-black';

o_email_capture_form.c_email_field.c_email_field_input_placeholder_attr =
	'Email';
o_email_capture_form.c_email_field.c_email_field_input_classes +=
	' lrv-u-border-a-0 lrv-u-font-size-14 lrv-u-width-100p lrv-u-margin-b-1 lrv-u-padding-lr-1 lrv-u-padding-tb-050 lrv-u-border-radius-5';
o_email_capture_form.c_email_field.c_email_field_input_id_attr = 'EmailAddress';
o_email_capture_form.c_email_field.c_email_field_input_name_attr =
	'EmailAddress';
o_email_capture_form.c_button.c_button_text = 'Subscribe Today';
o_email_capture_form.c_button.c_button_classes +=
	' lrv-u-background-color-black lrv-u-color-white lrv-u-border-radius-5 lrv-u-width-100p lrv-u-text-align-center lrv-u-padding-a-050 lrv-u-font-weight-bold';
o_email_capture_form.c_email_field.c_email_field_label_classes =
	'lrv-a-screen-reader-only';
o_email_capture_form.c_email_field.c_email_field_label_text = 'Email Address';

c_tagline_terms.c_tagline_classes =
	'lrv-u-margin-t-1 lrv-a-font-basic-xxs lrv-a-children-link-decoration-underline';
c_tagline_terms.c_tagline_text = false;
c_tagline_terms.c_tagline_markup =
	'By subscribing, I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.';

module.exports = {
	newsletter_classes:
		'lrv-u-padding-tb-2 lrv-u-padding-lr-2 lrv-u-flex lrv-u-flex-direction-column lrv-u-align-items-center',
	newsletter_typography_class: '',
	newsletter_text_align_class: '',
	newsletter_color_class: '',
	newsletter_background_color_class: '',
	c_title,
	c_logo,
	c_tagline,
	o_email_capture_form,
	c_tagline_terms,
};
