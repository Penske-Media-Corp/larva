/**
 * Remove @desktop-xl classes for Side Skins
 *
 * This is a CSS utility oriented solution for removing desktop XL
 * styling for side skins, since the skins will be present on
 * viewports > 1000px, we need to manually remove the desktop-xl
 * styles.
 *
 * This script removes all classes with an @desktop-xl extension.
 *
 * This and its test should be moved to Larva since this approach
 * has been copied into three sites.
 *
 * @author Lara Schenck 03-20-20
 */

export default function removeDesktopXlClasses() {
	// Get all elements with desktop-xl styling
	const desktopXlEls = [
		...document.querySelectorAll( '[class*="@desktop-xl"]' ),
	];

	// For each of these elements
	// rebuild the className without the @desktop-xl classes
	desktopXlEls.forEach( ( el ) => {
		const classes = el.className.split( ' ' );

		el.className = '';

		classes.forEach( ( c ) => {
			if ( ! c.includes( '@desktop-xl' ) ) {
				el.className += ` ${ c }`;
			}
		} );
	} );
}
