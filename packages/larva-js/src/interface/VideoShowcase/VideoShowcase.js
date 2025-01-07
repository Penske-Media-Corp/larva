import { delegateEvent } from '../../utils/dom';
import initCollapsibles from '../Collapsible';

/**
 *
 * Video Showcase.
 *
 * This module is heavily inspired by the VideoGallery module in the Rolling Stone. This is
 * version 2 of its descendent, Video Showcase, that was first written in Robb Report to support
 * Youtube only. This is a more state-forward approach of VideoShowcase that also supports JWPlayer.
 *
 * Important notes for using this pattern from Larva:
 *
 * This JS is intended to fit directly with the vlanding modules in larva-patterns. Refer to
 * vlanding-video-showcase in the Larva server and reference the UI there if you want to use this
 * outside of Larva.
 *
 * There is also required CSS for this module in larva-css/src/04-js/js-VideoShowcase.js. Import
 * that into your CSS build along with this JS file, and initialize the module with the
 * initVideoShowcase function in this directory's index.js.
 */

export default class VideoShowcase {
	constructor( el ) {
		this.el = el;

		// All triggers that contain video IDs to be played on click.
		this.triggers = [
			...el.querySelectorAll( '[data-video-showcase-trigger]' ),
		];

		// The main player that also, optionally may be a trigger. It should contain an iframe and #jwplayerContainer.
		this.player = el.querySelector( '[data-video-showcase-player]' );

		// Elements within the player that will be hidden after the first play.
		this.elementsToHide = [
			...this.el.querySelectorAll( '.is-to-be-hidden' ),
		];

		// Attributes that will be removed from the player once it is initialized. Only relevant for players that are
		// also triggers.
		this.attributesToRemoveFromPlayer = [
			'data-video-showcase-trigger',
			'data-video-showcase-title',
			'data-video-showcase-dek',
			'data-video-showcase-permalink',
			'data-video-showcase-type',
			'href',
		];

		/**
		 * State.
		 *
		 * @type {Object}
		 * @property {boolean} isPlayerSetup - Whether or not the player has been setup or played. Set in onFirstTimePlay()
		 * @property {string}  videoID       - A Youtube or JWPlayer ID extracted from a `data-video-showcase-trigger` e.g. f1FX5wvC3DA
		 * @property {string}  videoType     - "youtube" or "jwplayer" from `data-video-showcase-type`
		 */
		this.state = {
			isPlayerSetup: false,
			hasSocialShare: false,
			playerID: '',
			videoID: '',
			videoType: '',
		};

		/**
		 * Player UI.
		 *
		 * Note: the title and dek are using class selectors so they can be added to existing patterns.
		 *
		 * @type {Object}
		 * @property {HTMLElement} title             - A anchor element that will receive both a permalink and heading text.
		 * @property {HTMLElement} dek               - An element containing a direct child paragraph that will support the dek text.
		 * @property {HTMLElement} iframe            - The iframe that will recieve an src when a trigger with the Youtube video type is clicked.
		 * @property {HTMLElement} jwplayerContainer - The placeholder element where JWPlayer will be applied.
		 * @property {HTMLElement} social            - The main social share container that will be replaced with social share from triggers.
		 */
		this.playerUI = {
			title: el.querySelector( '.js-VideoShowcase-title' ),
			sponsoredBadge: el.querySelector(
				'.js-video-showcase-sponsored-badge'
			),
			dek: el.querySelector( '.js-VideoShowcase-dek' ),
			iframe: el.querySelector( '[data-video-showcase-iframe]' ),
			jwplayerContainer: el.querySelector(
				'[data-video-showcase-jwplayer], #jwplayerContainer'
			),
			social: el.querySelector(
				'[data-video-showcase-player-social-share]'
			),
			connatixContainer: el.querySelector(
				'[data-video-showcase-connatix]'
			),
			player: el.querySelector( '[data-video-player-id]' ),
		};

		this.init();
		if ( this.player.dataset.videoShowcaseAutoplay ) {
			this.handleTriggerClick( null, this.triggers[ 0 ] );
		} else {
			delegateEvent(
				this.el,
				'click',
				'[data-video-showcase-trigger]',
				this.handleTriggerClick.bind( this )
			);
		}
	}

	/**
	 * Startup Functionality.
	 *
	 * Set the state for whether this player has the social share
	 * functionality.
	 */

	init() {
		if ( null !== this.playerUI.social ) {
			this.state.hasSocialShare = true;
		}
	}

	/**
	 * Get Player Card Data.
	 *
	 * Set up a scaffold object that contains data from the trigger that will be applied
	 * to the main player card. These are all strings from data attributes except the
	 * social share, which replaces an entire block of HTML.
	 *
	 * @param    {HTMLElement} type         - Video type.
	 * @param    {HTMLElement} el           - A trigger.
	 *
	 * @return   {Object}               - An object containing the data needed to update the player.
	 * @property {string}      title        - Title text from the `data-video-showcase-title`
	 * @property {string}      dek          - Dek text from the `data-video-showcase-dek`
	 * @property {string}      permalink    - Link from `data-video-showcase-permalink`
	 * @property {string}      socialString - HTML string returned from wp.template.
	 */

	getPlayerCardData( type, el ) {
		let triggerID = '';
		if ( 'connatix' === type ) {
			triggerID = el.dataset.videoMediaId;
		} else {
			triggerID = el.dataset.videoShowcaseTrigger;
		}
		const hasSocialShare = this.state.hasSocialShare;

		return {
			title: el.dataset.videoShowcaseTitle,
			sponsored: el.dataset.videoShowcaseSponsored,
			dek: el.dataset.videoShowcaseDek,
			permalink: el.dataset.videoShowcasePermalink,
			socialString: ( function ( data ) {
				if ( window.wp && hasSocialShare ) {
					const template = wp.template(
						`trigger-social-share-${ triggerID }`
					);
					return template( data );
				}
			} )(),
		};
	}

	/**
	 * Update Player Card Data.
	 *
	 * Apply the assembled data to the UI.
	 *
	 * @param {HTMLElement} el   - A trigger.
	 * @param {Object}      data - An object of data from getPlayerCardData.
	 */

	updatePlayerCardData( el, data ) {
		if ( this.playerUI.title && data.title ) {
			this.playerUI.title.innerText = data.title;
		}

		if ( this.playerUI.title && data.permalink ) {
			this.playerUI.title.setAttribute( 'href', data.permalink );
		}

		if ( data.dek ) {
			this.playerUI.dek.innerText = data.dek;
		}

		if ( data.socialString && this.state.hasSocialShare ) {
			this.updateCardSocialShare( data.socialString );
		}

		if ( null !== this.playerUI.sponsoredBadge ) {
			if ( data.sponsored ) {
				this.playerUI.sponsoredBadge.classList.remove( 'u-hidden' );
			} else {
				this.playerUI.sponsoredBadge.classList.add( 'u-hidden' );
			}
		}
	}

	updateCardSocialShare( html ) {
		this.playerUI.social.removeChild(
			this.playerUI.social.querySelector( 'ul' )
		);

		// NOTE: html comes from JS template with escaped data.
		this.playerUI.social.insertAdjacentHTML( 'beforeend', html );

		initCollapsibles();
	}

	/**
	 * Return URL.
	 *
	 * Return an embed URL with the video ID based on the type of video.
	 *
	 * @param {string} id   - ID of the video e.g. f1FX5wvC3DA
	 * @param {string} type - Video type.
	 */
	returnUrl( id, type ) {
		if ( 'youtube' === type ) {
			return `https://www.youtube.com/embed/${ id }`;
		}

		if ( 'jwplayer' === type ) {
			return `https://content.jwplatform.com/feeds/${ id }.json`;
		}

		if ( 'twitch' === type ) {
			return `https://player.twitch.tv/?video=${ id }`;
		}

		if ( 'connatix' === type || 'iframe' === type ) {
			return id;
		}
	}

	/**
	 * Remove hidden attribute from the iframe and set the src.
	 *
	 * @param {string} youtubeUrl - A Youtube embed URL from returnUrl.
	 */
	playYoutube( youtubeUrl ) {
		this.playerUI.iframe.removeAttribute( 'hidden' );
		this.playerUI.iframe.setAttribute(
			'src',
			`${ youtubeUrl }?rel=0&autoplay=1&showinfo=0&controls=2&rel=0&modestbranding=0`
		);
	}

	/**
	 * Remove hidden attribute from the iframe and set the src.
	 *
	 * @param {string} mediaId  - Connatix media id.
	 * @param {string} playerId - Connatix player id.
	 */
	playConnatix( mediaId, playerId ) {
		this.playerUI.connatixContainer.removeAttribute( 'hidden' );
		const eleId = this.playerUI.connatixContainer.getAttribute( 'id' );
		// eslint-disable-next-line no-undef
		new Image().src =
			'https://capi.elements.video/tr/si?token=094029a3-814c-41d5-8a62-2c3adc647176&cid=1ffe63de-eb53-11e9-b4d2-06948452ae1a';
		// eslint-disable-next-line no-undef
		pmcCnx.cmd.push( function () {
			// eslint-disable-next-line no-undef
			pmcCnx( {
				playerId,
				mediaId,
			} )
				.render( eleId )
				.play();
		} );
	}

	/**
	 * Remove hidden attribute from the iframe and set the src.
	 *
	 * @param {string} twitchUrl - A Twitch embed URL from returnUrl.
	 */
	playTwitch( twitchUrl ) {
		this.playerUI.iframe.removeAttribute( 'hidden' );
		this.playerUI.iframe.setAttribute(
			'src',
			`${ twitchUrl }&autoplay=true&parent=${ window.location.hostname }`
		);
	}

	/**
	 * Remove hidden attribute from the iframe and set the src.
	 *
	 * @param {string} IframeUrl - Iframe embed URL from returnUrl.
	 */
	playIframeUrl( IframeUrl ) {
		this.playerUI.iframe.removeAttribute( 'hidden' );
		this.playerUI.iframe.setAttribute( 'src', IframeUrl );
	}

	/**
	 * Remove hidden attribute from jwplayerContainer and play the video with the jwplayer API.
	 * Note that `playlist` refers to a JWPlayer media object where the videos are handled within
	 * JWPlayer not the playlist taxonomy in WordPress.
	 *
	 * If there is something amiss, this is a good place to trouble shoot - it's possible we need to
	 * getPlaylist() first to retrieve an individual video, then play it, but this was working.
	 *
	 * @see https://developer.jwplayer.com/jw-player/docs/developer-guide/customization/configuration-reference/#playlist
	 * @param {string} playlistUrl - YouTube playlist URL.
	 */
	playJW( playlistUrl ) {
		this.playerUI.jwplayerContainer.removeAttribute( 'hidden' );

		if ( window.pmc_jwplayer ) {
			window
				.pmc_jwplayer( this.playerUI.jwplayerContainer.id )
				.setup( {
					playlist: playlistUrl,
					aspectratio: '16:9',
				} )
				.play();
		}
	}

	/**
	 * Trigger Click Handler.
	 *
	 * Reset player from previous state, update state and player UI, play the video.
	 *
	 * @param {Event}       e
	 * @param {HTMLElement} el - Clicked trigger element.
	 */
	handleTriggerClick( e, el ) {
		if ( e ) {
			e.preventDefault();
		}

		if ( 'object' !== typeof el ) {
			return false;
		}

		const previousVideoType = this.state.videoType;
		this.resetPlayer( previousVideoType );
		this.state.videoType = el.dataset.videoShowcaseType;
		if ( 'connatix' === el.dataset.videoShowcaseType ) {
			this.state.videoID = el.dataset.videoMediaId;
			this.state.playerID = el.dataset.videoPlayerId;
		} else {
			this.state.videoID = el.dataset.videoShowcaseTrigger;
		}
		this.playVideo( this.state );
		this.updatePlayerUI( this.state );
		this.onFirstTimePlay();
	}

	/**
	 * Play the video.
	 *
	 * A wrapper function to conditonally play videos according to their type.
	 *
	 * @param {Object} state - Includes Video ID, Player ID and Video type.
	 */
	playVideo( state ) {
		const url = this.returnUrl( state.videoID, state.videoType );

		if ( 'youtube' === state.videoType ) {
			this.playYoutube( url );
		}

		if ( 'jwplayer' === state.videoType ) {
			this.playJW( url );
		}

		if ( 'twitch' === state.videoType ) {
			this.playTwitch( url );
		}

		if ( 'connatix' === state.videoType ) {
			const playerId = this.playerUI.player.dataset.videoPlayerId;
			this.playConnatix( url, playerId );
		}

		if ( 'iframe' === state.videoType ) {
			this.playIframeUrl( url );
		}
	}

	// Remove any trigger-related data attributes and hide any elements that are not relevant for the player.
	onFirstTimePlay() {
		if ( false === this.state.isPlayerSetup ) {
			this.el.dispatchEvent( new CustomEvent( 'firstVideoPlay' ) );

			this.elementsToHide.forEach( ( e ) =>
				e.setAttribute( 'hidden', '' )
			);
			this.attributesToRemoveFromPlayer.forEach( ( attr ) =>
				this.player.parentNode.removeAttribute( attr )
			);
			this.state.isPlayerSetup = true;
		}
	}

	/**
	 * Update the UI.
	 *
	 * Replace the title and dek elements and mark the active trigger.
	 *
	 * @param {string} state - Includes Video ID, Player ID and Video type.
	 */
	updatePlayerUI( state ) {
		let clickedTrigger = '';
		if ( 'connatix' === state.videoType ) {
			clickedTrigger = this.el.querySelector(
				`[data-video-media-id="${ state.videoID }"]`
			);
		} else {
			clickedTrigger = this.el.querySelector(
				`[data-video-showcase-trigger="${ state.videoID }"]`
			);
		}
		const data = this.getPlayerCardData( state.videoType, clickedTrigger );

		this.setActiveTrigger( state.videoType, state.videoID );
		this.updatePlayerCardData( clickedTrigger, data );
	}

	/**
	 * Reset Player.
	 *
	 * Hide both players and either remove JWPlayer or reset the src for the iframe according
	 * to the previous type of video played.
	 *
	 * @todo this could check for the current type and only run if the current type is not the
	 * same as the past type.
	 *
	 * @param {string} pastType - Youtube or JWplayer ID, should be from this.state.videoID, e.g. f1FX5wvC3DA
	 */
	resetPlayer( pastType ) {
		if ( 'jwplayer' === pastType && window.pmc_jwplayer ) {
			window.pmc_jwplayer( 'jwplayerContainer' ).remove();
			this.playerUI.jwplayerContainer.setAttribute( 'hidden', '' );
		}

		if ( 'youtube' === pastType ) {
			this.playerUI.iframe.setAttribute( 'src', '' );
			this.playerUI.iframe.setAttribute( 'hidden', '' );
		}

		if ( 'connatix' === pastType ) {
			const elements =
				document.getElementsByClassName( 'cnx-main-container' );
			while ( elements.length > 0 ) {
				elements[ 0 ].parentNode.removeChild( elements[ 0 ] );
			}
		}
	}

	// Remove `is-playing` class from all triggers.
	resetAllTriggers() {
		this.triggers.forEach( ( el ) => el.classList.remove( 'is-playing' ) );
	}

	/**
	 * Reset triggers and mark the current active trigger.
	 *
	 * @param {string} type - Type of Video.
	 * @param {string} id   - Youtube or JWplayer ID, should be from this.state.videoID, e.g. f1FX5wvC3DA
	 */
	setActiveTrigger( type, id ) {
		let trigger = '';
		if ( 'connatix' === type ) {
			trigger = this.el.querySelector(
				`.related-videos [data-video-media-id="${ id }"]`
			);
		} else {
			trigger = this.el.querySelector(
				`[data-video-showcase-trigger="${ id }"]`
			);
		}

		this.resetAllTriggers();

		if ( null !== trigger ) {
			trigger.classList.add( 'is-playing' );
		}
	}
}
