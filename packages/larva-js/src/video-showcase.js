import initCollapsible from './interface/Collapsible';
import initFlickity from './interface/Flickity';
import initVideoShowcase from './interface/VideoShowcase';

// This rule is meant for React components.
document.addEventListener( 'DOMContentLoaded', () => {
	initCollapsible();
	initFlickity();
	initVideoShowcase();
} );
