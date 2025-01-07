// navigator is part of webfontloader.
/* global navigator */

import { Route, Routes, useMatch } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { TokenForm } from './TokenForm';
import { InitialForm } from './InitialForm';
import {
	getCoreColorsFromTokens,
	getUpdatedTokensWithCoreColors,
} from '../utils/coreColorTokens';

export const TokensView = () => {
	const match = useMatch();

	const TOKENS_FETCH_URL =
		'https://raw.githubusercontent.com/penske-media-corp/pmc-larva/master/packages/larva-tokens/build/';

	const appActions = {
		create: 'create',
		update: 'update',
	};

	const [ selectedBrand, setSelectedBrand ] = useState( {
		action: '',
		brand: '',
	} );

	const supportsshowSaveFilePicker = () =>
		undefined !== window.showSaveFilePicker;

	const [ tokens, setTokens ] = useState( {} );
	const [ defaultTokens, setDefaultTokens ] = useState( {} );
	const [ copied, setCopied ] = useState( false );
	const [ copyText, setCopyText ] = useState( '' );
	const [ canSaveFile ] = useState( supportsshowSaveFilePicker );
	const [ coreColorTokens, setCoreColorTokens ] = useState( {} );

	// Handle the updates that are side effects of the
	// check for browser support
	useEffect( () => {
		const beforeText = canSaveFile
			? 'Save JSON to File'
			: 'Copy JSON to Clipboard';
		const afterText = canSaveFile ? 'Saved!' : 'Copied!';

		if ( copied ) {
			setCopyText( afterText );
		} else {
			setCopyText( beforeText );
		}
	}, [ copied, copyText, canSaveFile ] );

	const handleUpdateBrand = ( brand, action ) => {
		setSelectedBrand( {
			brand,
			action,
		} );
	};

	const updateTokenValue = ( tokenData, newValue ) => {
		const updateValueHelper = ( tokensObj, updateStateFn ) => {
			tokensObj[ tokenData.name ].value = newValue;

			updateStateFn( tokensObj );
		};

		if ( tokenData.category !== 'core-color' ) {
			updateValueHelper( tokens, setTokens );
		} else {
			updateValueHelper( coreColorTokens, setCoreColorTokens );
		}
	};

	const updateTokensWithCoreColors = () => {
		const newTokens = getUpdatedTokensWithCoreColors(
			tokens,
			coreColorTokens
		);
		setTokens( newTokens );
	};

	const updateCoreColors = () => {
		const newCoreColors = getCoreColorsFromTokens( tokens );

		setCoreColorTokens( newCoreColors );
	};

	const fetchAndSetTokens = async () => {
		const brand =
			appActions.create === selectedBrand.action
				? 'default'
				: selectedBrand.brand;

		const url = TOKENS_FETCH_URL + brand + '.raw.json';
		const response = await fetch( url );
		const json = await response.json();
		const newTokens = await json.props;
		const sortedKeys = await Object.keys( newTokens ).sort();
		const sortedTokens = sortedKeys.reduce( ( tokensObj, key ) => {
			tokensObj[ key ] = newTokens[ key ];
			return tokensObj;
		}, {} );

		const reducedColorTokens = await getCoreColorsFromTokens( newTokens );
		const sortedColorKeys = Object.keys( reducedColorTokens ).sort();
		const sortedColorTokens = sortedColorKeys.reduce(
			( sortedColors, key ) => {
				sortedColors[ key ] = reducedColorTokens[ key ];
				return sortedColors;
			},
			{}
		);

		setCoreColorTokens( sortedColorTokens );
		setTokens( sortedTokens );

		const initialDefaultTokens = ( async () => {
			if ( 'default' === brand ) {
				// Deep clone the object since we are checking equivalence later.
				return JSON.parse( JSON.stringify( sortedTokens ) );
			}
			const thisUrl = TOKENS_FETCH_URL + '/default.raw.json';
			const thisResponse = await fetch( thisUrl );
			const thisJson = await thisResponse.json();
			const theseTokens = await thisJson.props;

			return theseTokens;
		} )();

		// Save unchanged tokens so we can tell what is
		// different from the original
		setDefaultTokens( await initialDefaultTokens );
	};

	/**
	 * Save JSON to file for browsers that support it, and fallback to
	 * copy to clipboard for browsers that don't.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/window/showSaveFilePicker
	 */
	const saveJsonToFile = async () => {
		const diffedTokens = ( ( changed, reference ) => {
			const updatedTokenKeys = Object.keys( changed ).filter( ( key ) => {
				// If changed key is not present in the reference, then it
				// is a custom token, and we should keep it
				if ( undefined === reference[ key ] ) {
					return true;
				}

				return changed[ key ].value !== reference[ key ].value;
			} );

			return updatedTokenKeys.reduce( ( acc, curr ) => {
				acc[ curr ] = { ...changed[ curr ] };
				return acc;
			}, {} );
		} )( tokens, defaultTokens );

		const tokensOutput = {
			imports: [ '../base/all.json', '../base/typography.json' ],
			props: { ...diffedTokens },
		};

		if ( canSaveFile ) {
			const tokensBlob = new Blob(
				[ JSON.stringify( tokensOutput, null, 2 ) ],
				{
					type: 'application/json',
				}
			);

			// create a new handle
			const newHandle = await window.showSaveFilePicker( {
				types: [
					{
						name: selectedBrand.brand,
						accept: { 'text/json': [ '.json' ] },
					},
				],
			} );

			// create a FileSystemWritableFileStream to write to
			const writableStream = await newHandle.createWritable();

			// write our file
			await writableStream.write( tokensBlob );

			// close the file and write the contents to disk.
			await writableStream.close();
		} else {
			await navigator.clipboard.writeText(
				JSON.stringify( tokensOutput, null, 2 )
			);
		}

		setCopied( true );
	};

	return (
		<Routes>
			<Route path={ `${ match.url }/:action` }>
				<TokenForm
					tokens={ tokens }
					updateTokenValue={ updateTokenValue }
					updateTokensWithCoreColors={ updateTokensWithCoreColors }
					updateCoreColors={ updateCoreColors }
					brandName={ selectedBrand.brand }
					action={ selectedBrand.action }
					saveJsonToFile={ saveJsonToFile }
					copyText={ copyText }
					coreColorTokens={ coreColorTokens }
					copied={ copied }
					appActions={ appActions }
				/>
			</Route>
			<Route path={ `${ match.url }` }>
				<InitialForm
					fetchAndSetTokens={ fetchAndSetTokens }
					handleUpdateBrand={ handleUpdateBrand }
					selectedBrand={ selectedBrand }
					appActions={ appActions }
				/>
			</Route>
		</Routes>
	);
};
