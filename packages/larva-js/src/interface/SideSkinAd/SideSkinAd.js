/**
 * Side Skin Ads Reflow
 *
 * Prepare DOM for side skin ad by:
 * - adding an HTML class
 * - dispatching the 'resize' event so any JS-related DOM rerenders
 * - remove @desktop-xl CSS utilities to force the desktop breakpoint design
 *
 * Use a counter to ensure this script only runs one time.
 */

import removeDesktopXlClasses from '../../utils/removeDesktopXlClasses';

// TODO: Should refactor to follow our exporting classes pattern, and
// include the conditions from index.js in the class
export default function reflowForSideSkinAd() {
	if ( undefined === window.pmc_side_skin_classes_removed ) {
		document.documentElement.classList.add( 'has-side-skins' );
		removeDesktopXlClasses();
		window.pmc_side_skin_classes_removed = true;
	}

	// Fix for JWplayer preroll ad size issue when skin ads are served,
	// also required for Flickity to rebuild
	window.dispatchEvent( new Event( 'resize' ) );
}
