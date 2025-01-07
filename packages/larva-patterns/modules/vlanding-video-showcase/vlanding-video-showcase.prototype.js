const clonedeep = require( 'lodash.clonedeep' );

const vlanding_video_card = clonedeep(
	require( '../../modules/vlanding-video-card/vlanding-video-card.prototype' )
);
const social_share = clonedeep(
	require( '../../modules/social-share/social-share.prototype' )
);
const c_span = clonedeep(
	require( '../../components/c-span/c-span.prototype' )
);
const c_title = clonedeep(
	require( '../../components/c-title/c-title.prototype' )
);
const c_dek = clonedeep( require( '../../components/c-dek/c-dek.prototype' ) );
const c_heading = clonedeep(
	require( '../../components/c-heading/c-heading.prototype' )
);

const vlanding_video_card_player = clonedeep( vlanding_video_card );
const vlanding_video_showcase_card = clonedeep( vlanding_video_card );

const demoVideos = [
	'TxC_UpC0iyk',
	'_JFOdYRfqBQ',
	'UmjBAjsLMms',
	'bgs2PgWE',
	'getvYflDK98',
];

const vlanding_video_showcase_video_cards = [];

vlanding_video_showcase_card.c_title.c_title_url = false;
vlanding_video_showcase_card.c_title.c_title_classes =
	'lrv-u-font-size-14 lrv-u-font-weight-normal lrv-u-padding-t-050';

vlanding_video_showcase_card.c_span.c_span_classes +=
	' lrv-u-display-block lrv-u-padding-b-00 lrv-u-padding-t-050 lrv-u-font-size-12 lrv-u-font-weight-normal';

vlanding_video_card_player.c_title = false;
vlanding_video_card_player.c_span = false;

// Move the crop class to the card so the iframe will position relative to that
// instead of c-lazy-image
vlanding_video_card_player.vlanding_video_card_is_player = true;
vlanding_video_card_player.c_lazy_image.c_lazy_image_crop_class = '';
vlanding_video_card_player.vlanding_video_card_crop_class = 'lrv-a-crop-16x9';

c_title.c_title_classes =
	'lrv-u-font-size-24 lrv-u-font-size-32@desktop lrv-u-padding-b-1 js-VideoShowcase-title';
c_title.c_title_link_classes = 'lrv-a-unstyle-link';
c_title.c_title_text = "Roseanne is Cancelled and I'm So Sad About It";

c_dek.c_dek_classes =
	'lrv-u-font-size-18 lrv-u-margin-t-00 lrv-a-hidden@mobile-max js-VideoShowcase-dek';

c_heading.c_heading_text = 'The Latest Videos';
c_heading.c_heading_classes =
	'lrv-u-font-size-18 lrv-u-font-size-24@desktop lrv-u-font-size-28@desktop-xl lrv-u-border-b-1 lrv-u-border-color-grey-light lrv-u-padding-b-050 lrv-u-margin-tb-1';

vlanding_video_showcase_card.vlanding_video_card_link_showcase_trigger_data_attr =
	'_JFOdYRfqBQ';
vlanding_video_showcase_card.vlanding_video_card_link_showcase_type_data_attr =
	'youtube';
vlanding_video_showcase_card.c_span = false;

// eslint-disable-next-line array-callback-return
demoVideos.map( ( videoId ) => {
	const newVideo = clonedeep( vlanding_video_showcase_card );

	newVideo.vlanding_video_card_link_showcase_trigger_data_attr = videoId;
	vlanding_video_showcase_video_cards.push( newVideo );
} );

module.exports = {
	vlanding_video_showcase_classes: '',
	vlanding_video_card_player,
	c_span,
	c_title,
	c_dek,
	social_share,
	c_heading,
	vlanding_video_showcase_video_cards_classes:
		'js-Flickity js-Flickity--fifths js-Flickity--isContained',
	vlanding_video_showcase_video_cards_item_classes:
		'js-Flickity-cell lrv-u-margin-r-1',
	vlanding_video_showcase_video_cards,
};
