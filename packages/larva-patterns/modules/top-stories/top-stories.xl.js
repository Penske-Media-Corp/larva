const clonedeep = require( 'lodash.clonedeep' );

const top_stories = clonedeep( require( './top-stories.prototype' ) );

top_stories.o_story_featured.c_title.c_title_classes =
	'lrv-a-font-primary-xl c-title lrv-u-display-block lrv-u-margin-b-050';
top_stories.o_story_featured.c_link_bottom = false;

// eslint-disable-next-line array-callback-return
top_stories.stories.map( ( o_story ) => {
	o_story.c_span = false;
	o_story.c_link_bottom = false;
} );

module.exports = top_stories;
