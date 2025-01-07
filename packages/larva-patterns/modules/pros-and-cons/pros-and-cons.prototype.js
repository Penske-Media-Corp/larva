const clonedeep = require( 'lodash.clonedeep' );

const c_heading = clonedeep(
	require( '../../components/c-heading/c-heading.prototype' )
);
const list_markup = '<ul><li>List Item</li></ul>';

const item = {
	c_heading,
	list_markup,
};

module.exports = {
	pros_and_cons_classes:
		'lrv-u-flex lrv-u-border-a-1 lrv-a-children-border-horizontal',
	pros_and_cons_inner_classes: 'lrv-u-padding-a-1 lrv-u-width-50p',
	items: [ item, item ],
};
