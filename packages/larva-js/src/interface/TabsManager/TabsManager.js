/**
 * Tabs Manager
 *
 * @todo Add hover support
 * @see https://bitbucket.org/penskemediacorp/pmc-indiewire-2016/src/master/assets/src/js/modules/TabsManager/TabsManager.js
 */

export default class TabsManager {
	/**
	 * Initialize
	 *
	 * @param {node} el Tabs container
	 */
	constructor( el ) {
		this.el = el;
		this.customInteraction = 'click';
		this.toggleEl = this.el.querySelectorAll( '.js-TabsToggle' );
		this.panels = [ ...this.el.querySelectorAll( '.js-TabsPanel' ) ];

		this.onClick = this.onClick.bind( this );
		this.toggle = this.toggle.bind( this );
		this.deactivatePanels = this.deactivatePanels.bind( this );

		this.toggleEl.forEach( ( toggle ) =>
			toggle.addEventListener( 'click', this.onClick )
		);
	}

	/**
	 * Trigger Toggle event
	 *
	 * @param {event} event Triggered event
	 */
	onClick( event ) {
		const trigger = event.currentTarget;
		if ( trigger.classList.contains( 'is-active' ) ) {
			event.preventDefault();
			return;
		}

		this.toggle( event );
	}

	/**
	 * Find and activate desired tab panel
	 *
	 * @param {event} event Previously triggered event
	 */
	toggle( event ) {
		const toggle = event.currentTarget;
		const panelId = toggle.getAttribute( 'href' );
		const panel = this.el.querySelector( panelId );

		if ( ! panel ) {
			return;
		}

		const panelsWrapper = this.el.closest( '.js-Tabs' );

		event.preventDefault();

		panelsWrapper.classList.add( 'is-changing' );

		this.deactivatePanels();

		toggle.classList.add( 'is-active' );
		panel.classList.add( 'is-active' );

		setTimeout( () => {
			panelsWrapper.classList.remove( 'is-changing' );
		}, 50 );
	}

	/**
	 * Remove active status from all items
	 */
	deactivatePanels() {
		const toggles = this.el.querySelectorAll(
			'.js-TabsToggle.is-active, .js-TabsPanel.is-active'
		);

		if ( ! toggles || 0 === toggles.length ) {
			return;
		}

		toggles.forEach( ( item ) => item.classList.remove( 'is-active' ) );
	}
}
