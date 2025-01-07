/**
 * Reduce color tokens to a set of "Linked Colors". These are called
 * Core colors in the code.
 *
 * Core colors are the color names and values that are repeated across tokens
 * for different CSS properties so that the color can be added and updated
 * in a single place.
 *
 * e.g. for COLOR_BRAND_PRIMARY, BORDER_COLOR_BRAND_PRIMARY, BACKGROUND_COLOR_BRAND_PRIMARY
 * this method will return a single BRAND_PRIMARY if all of the above have the same color value.
 *
 * @param {Object} tokens The raw.json format of design tokens stored in the `tokens` state
 *
 * @return {Object} An object of core color tokens who's keys are only the color name.
 */
export const getCoreColorsFromTokens = ( tokens ) => {
	const colorKeys = Object.keys( tokens ).filter( ( key ) =>
		key.includes( 'COLOR_' )
	);

	/**
	 * Create a store for values associated with each color token so
	 * we can determine if any of the colors names are not repeatable.
	 *
	 * @return Object containing keys for the color names and a list of values
	 *         used for each color.
	 */
	const colorTokenValuesStore = colorKeys.reduce( ( valuesAcc, key ) => {
		const name = key.split( 'COLOR_' )[ 1 ];
		const { value } = tokens[ key ];

		if ( valuesAcc.hasOwnProperty( name ) ) {
			valuesAcc[ name ].push( value );
			return valuesAcc;
		}

		valuesAcc[ name ] = [ value ];

		return valuesAcc;
	}, {} );

	/**
	 * Build an object containing tokens for each of the colors that
	 * are "core colors" i.e. that have consistent values across all tokens.
	 *
	 * @return Object containing the "core color" tokens
	 */
	const coreColorTokens = Object.keys( colorTokenValuesStore ).reduce(
		( colorsAcc, colorKey ) => {
			const colorValuesList = colorTokenValuesStore[ colorKey ];
			const colorHasConsistentValues =
				colorValuesList.filter(
					( currValue, index ) =>
						currValue !== colorValuesList[ index + 1 ]
				).length === 1;

			if ( colorHasConsistentValues ) {
				colorsAcc[ colorKey ] = {
					name: colorKey,
					type: 'color',
					value: colorValuesList[ 0 ],
					category: 'core-color',
				};
			}

			return colorsAcc;
		},
		{}
	);

	return coreColorTokens;
};

/**
 * Compare the token colors with the core colors, and if the token
 * uses on of the core colors, update the value to the core color.
 *
 * @param {Object} tokensToUpdate The raw.json tokens state object
 * @param {Object} coreColors     The core colors tokens state object
 *
 * @return {Object} The full tokens object.
 */
export const getUpdatedTokensWithCoreColors = (
	tokensToUpdate,
	coreColors
) => {
	const tokenKeys = Object.keys( tokensToUpdate );

	const colorTokenReducer = ( newTokens, key ) => {
		const fullToken = { ...tokensToUpdate[ key ] };

		if ( key.includes( 'COLOR_' ) ) {
			const coreColorName = key.split( 'COLOR_' )[ 1 ];

			if ( coreColors.hasOwnProperty( coreColorName ) ) {
				fullToken.value = coreColors[ coreColorName ].value;
			}
		}

		newTokens[ key ] = {
			...fullToken,
		};

		return newTokens;
	};

	return tokenKeys.reduce( colorTokenReducer, {} );
};
