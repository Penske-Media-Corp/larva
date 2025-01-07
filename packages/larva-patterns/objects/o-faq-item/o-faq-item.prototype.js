const clonedeep = require( 'lodash.clonedeep' );

const c_title = clonedeep(
	require( '../../components/c-title/c-title.prototype' )
);
const c_dek = clonedeep( require( '../../components/c-dek/c-dek.prototype' ) );

c_title.c_title_url = '';
c_title.c_title_classes = 'lrv-u-margin-t-1 lrv-u-padding-b-1 lrv-u-border-b-1';

module.exports = {
	modifier_class: '',
	o_faq_item_classes: '',
	c_title,
	c_dek,
};
