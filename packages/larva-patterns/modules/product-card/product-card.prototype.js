const clonedeep = require( 'lodash.clonedeep' );

const c_lazy_image = clonedeep(
	require( '../../components/c-lazy-image/c-lazy-image.prototype' )
);
const c_figcaption = clonedeep(
	require( '../../components/c-figcaption/c-figcaption.prototype' )
);
const c_title = clonedeep(
	require( '../../components/c-title/c-title.prototype' )
);
const c_tagline = clonedeep(
	require( '../../components/c-tagline/c-tagline.prototype' )
);
const c_button = clonedeep(
	require( '../../components/c-button/c-button.prototype' )
);
const c_dek = clonedeep( require( '../../components/c-dek/c-dek.prototype' ) );

c_figcaption.c_figcaption_caption_markup = false;
c_figcaption.c_figcaption_credit_text_markup = 'Courtesy of Nordic Track';
c_figcaption.c_figcaption_classes =
	'lrv-u-flex lrv-u-justify-content-end lrv-u-margin-t-025 lrv-u-color-grey-dark lrv-u-text-transform-uppercase lrv-a-font-basic-xxs';

c_title.c_title_text = 'NordicTrack Commercial S22i Studio Cycle';
c_title.c_title_classes =
	'lrv-a-font-primary-xxl lrv-u-margin-t-1 lrv-u-margin-t-075@mobile-max lrv-a-unstyle-inner-links';
c_title.c_title_url = '';

c_tagline.c_tagline_text = 'Powerful, iFit ready, and priced right!';
c_tagline.c_tagline_classes =
	'lrv-a-font-body-xxl lrv-u-margin-t-125 lrv-u-margin-b-00';

c_button.c_button_classes =
	'lrv-u-margin-t-125 lrv-a-font-basic-m lrv-a-unstyle-link lrv-u-display-block';
c_button.c_button_inner_classes =
	'lrv-u-border-b-2 lrv-u-border-t-2 lrv-u-border-l-1 lrv-u-border-r-1 lrv-u-padding-tb-050 lrv-u-text-transform-uppercase lrv-a-icon lrv-a-icon-before lrv-u-align-items-start lrv-u-padding-lr-050 lrv-u-background-color-brand-primary:hover';
c_button.c_button_text = 'Subscribe $65.99';
c_button.c_button_url = '#';
c_button.product_card_price_outside = false;

const buy_now_buttons = [ c_button, c_button ];

c_dek.c_dek_text = false;
c_dek.c_dek_markup =
	'NordicTrack went a similar route as Bowflex with their S22i cycle.Instead of the regular fixed position, the S22i can adjust for incline (up to 20%) and decline (down to -10%) for a more realistic ride and better muscle engagement. The kicker with this feature is that trainers can digitally adjust your bike’s incline/decline in real-time during a live class. The S22i’s construction is top-quality with a steel frame and a solid 32-pound flywheel. The bike also uses NordicTrack’s SMR Silent Magnetic Resistance system which improves fluidity while making the bike quieter as well. NordicTrack offers both live, studio-like classes as well as a library of on-demand sessions through their iFit membership. You also get off-bike exercises including strength training, meditation and mindfulness sessions with a swivel of the screen. This iFit service has somewhat of a leg up on other brands because you get a whole year free to test it out. The classes, along with a swath of exercise metrics, are shown on a large, crisp 22-inch display. Among these stats is heart rate, which the bike measures via hand pulse sensors or a separate Bluetooth-connected monitor.';
c_dek.c_dek_classes =
	'lrv-u-order-100 lrv-u-margin-t-125 lrv-u-margin-t-2@mobile-max lrv-a-font-body-xxl lrv-u-margin-b-050';

module.exports = {
	product_card_wrapper_classes: 'lrv-u-padding-tb-125',
	c_lazy_image,
	c_figcaption,
	c_title,
	c_tagline,
	buy_now_buttons,
	c_dek,
};
