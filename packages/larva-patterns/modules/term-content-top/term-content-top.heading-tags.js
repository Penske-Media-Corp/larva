const clonedeep = require( 'lodash.clonedeep' );

/**
 * Module includes.
 */
const term_content_top = clonedeep( require( './term-content-top.prototype' ) );
const tag_list = clonedeep(
	require( '../../modules/tag-list/tag-list.thumbnail' )
);

term_content_top.o_figure = '';
term_content_top.fact_list = '';
term_content_top.fact_list_menu = '';
term_content_top.tag_list = tag_list;

module.exports = term_content_top;
