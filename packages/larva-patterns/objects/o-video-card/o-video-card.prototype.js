const clonedeep = require( 'lodash.clonedeep' );

const c_play_icon_prototype = require( '../../components/c-play-badge/c-play-badge.prototype.js' );
const c_play_icon = clonedeep( c_play_icon_prototype );

const o_indicator_prototype = require( '../o-indicator/o-indicator.prototype.js' );
const o_indicator = clonedeep( o_indicator_prototype );

const c_dek_prototype = require( '../../components/c-dek/c-dek.prototype.js' );
const c_dek = clonedeep( c_dek_prototype );

c_play_icon.c_play_badge_classes =
	'lrv-a-glue lrv-a-glue--b-0 u-transform-translate-a-n50p u-width-55 u-height-55 is-to-be-hidden';
c_play_icon.c_play_badge_background_fill_classes =
	'lrv-u-background-color-transparent';

o_indicator.o_indicator_classes = 'lrv-u-margin-b-025 u-margin-t-050@tablet';

c_dek.c_dek_classes = 'lrv-u-display-none js-VideoShowcasePlayerDek';

module.exports = {
	o_video_card_permalink_url: '#single_url',
	o_video_card_alt_attr: 'Thumbnail image',
	o_video_card_image_url: 'https://source.unsplash.com/random/595x333',
	o_video_card_lazy_image_url: 'https://source.unsplash.com/random/595x333',
	o_video_card_caption_text: 'Here is some caption text',
	o_video_card_link_showcase_trigger_data_attr:
		"<div class='embed-youtube'><iframe title='Spring - Blender Open Movie' width='500' height='281' src='https://www.youtube.com/embed/WhWc3b3KhnY?feature=oembed&autoplay=1&mute=1' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen=''></iframe></div>",
	o_video_card_link_showcase_type_data_attr: 'oembed',
	o_video_card_link_showcase_permalink_data_url: '#url_test',
	modifier_class: '',
	o_video_card_classes:
		'u-background-color-picked-bluewood u-margin-r-1@tablet lrv-u-justify-content-space-between',
	o_video_card_crop_class:
		'lrv-a-crop-16x9 lrv-a-glue-parent c-play-badge-parent',
	o_video_card_image_classes: 'is-to-be-hidden lrv-u-display-block',
	o_video_card_is_player: true,
	c_label: '',
	o_video_card_crop_data_attr: '',
	o_video_card_meta_classes:
		'lrv-u-flex lrv-u-flex-direction-column lrv-u-width-100p u-padding-lr-075@mobile-max lrv-u-padding-tb-050 u-position-relative',
	o_video_card_link_classes: 'lrv-u-width-100p',
	o_video_card_permalink_classes: 'u-margin-r-050@mobile-max',
	c_play_icon,
	c_title: false,
};
