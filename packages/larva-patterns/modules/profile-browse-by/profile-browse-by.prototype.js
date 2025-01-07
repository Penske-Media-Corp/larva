const clonedeep = require( 'lodash.clonedeep' );

const c_heading = clonedeep(
	require( '../../components/c-heading/c-heading.prototype' )
);
const o_card_list = clonedeep(
	require( '../../objects/o-card-list/o-card-list.prototype' )
);

c_heading.c_heading_classes +=
	' lrv-u-text-align-center lrv-u-font-family-secondary lrv-u-font-size-36 lrv-u-font-size-46@desktop-xl lrv-u-padding-b-2';
c_heading.c_heading_text = 'Browse By Categories';

o_card_list.o_card_list_classes +=
	' lrv-u-flex lrv-a-space-children-horizontal lrv-a-space-children--2 lrv-u-justify-content-space-evenly lrv-u-flex-wrap-wrap';

o_card_list.o_card_list_item_classes +=
	' lrv-u-text-align-center lrv-u-margin-b-1';

// eslint-disable-next-line array-callback-return
o_card_list.o_card_list_items.map( ( o_card ) => {
	o_card.c_lazy_image.c_lazy_image_img_classes += ' lrv-u-border-radius-50p';
	o_card.c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-1x1';

	o_card.o_card_link_url = '#';
	o_card.o_card_link_classes = 'lrv-a-unstyle-link';
	o_card.c_title.c_title_classes += ' lrv-u-margin-t-1';
	o_card.c_title.c_title_url = false;
	o_card.c_span = false;
	o_card.c_timestamp = false;
} );

module.exports = {
	profile_browse_by_classes: '',
	c_heading,
	o_card_list,
};
