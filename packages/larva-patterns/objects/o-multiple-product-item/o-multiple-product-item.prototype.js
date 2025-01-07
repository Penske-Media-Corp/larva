const clonedeep = require( 'lodash.clonedeep' );

const c_lazy_image = clonedeep(
	require( '../../components/c-lazy-image/c-lazy-image.prototype' )
);
const article_kicker = clonedeep(
	require( '../../modules/article-kicker/article-kicker.prototype' )
);
const c_title = clonedeep(
	require( '../../components/c-title/c-title.prototype' )
);
const c_link = clonedeep(
	require( '../../components/c-link/c-link.prototype' )
);
const c_button = clonedeep(
	require( '../../components/c-button/c-button.prototype' )
);

c_lazy_image.c_lazy_image_crop_class = 'lrv-a-crop-1x1';

module.exports = {
	modifier_class: '',
	c_lazy_image,
	article_kicker,
	c_title,
	c_link,
	c_button,
};
