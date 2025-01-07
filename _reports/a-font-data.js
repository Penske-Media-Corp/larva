/**
 * Process:
 *
 * For each brand, go to https://<brand>.larva.pmcdev.io/project/__tests__/style-guide/
 * In the console, type:
  let arr = [];
  document.querySelectorAll( 'p[class^=a-font]').forEach( node => arr.push( node.classList[0] ) )
  console.log( arr )
 * Copy the object and those are the font names.
 * This could be automated in the future.
 *
 * To run this report, in the console:
 * node _reports/a-font-data.js
 */

const fontDataByBrand = {
	spark: [
		'a-font-primary-xl',
		'a-font-primary-l',
		'a-font-primary-m',
		'a-font-primary-s',
		'a-font-primary-xs',
		'a-font-secondary-bold-xl',
		'a-font-secondary-bold-l',
		'a-font-secondary-bold-m',
		'a-font-secondary-bold-s',
		'a-font-secondary-bold-xs',
		'a-font-secondary-regular-xl',
		'a-font-secondary-regular-l',
		'a-font-secondary-regular-m',
		'a-font-secondary-regular-s',
		'a-font-secondary-regular-xs',
		'a-font-accent-xl',
		'a-font-accent-l',
		'a-font-accent-m',
		'a-font-accent-s',
		'a-font-accent-xs',
		'a-font-basic-xl',
		'a-font-basic-l',
		'a-font-basic-m',
		'a-font-basic-s',
		'a-font-basic-xs',
		'a-font-body-xl',
		'a-font-body-l',
		'a-font-body-m',
		'a-font-body-s',
		'a-font-body-xs',
	],

	vibe: [
		'a-font-primary-bold-xxxl',
		'a-font-primary-bold-xxl',
		'a-font-primary-bold-xl',
		'a-font-primary-bold-l',
		'a-font-primary-bold-m',
		'a-font-primary-bold-s',
		'a-font-secondary-bold-xxxl',
		'a-font-secondary-bold-xxl',
		'a-font-secondary-bold-xl',
		'a-font-secondary-bold-l',
		'a-font-secondary-bold-m',
		'a-font-secondary-bold-s',
		'a-font-secondary-regular-xxxl',
		'a-font-secondary-regular-xxl',
		'a-font-secondary-regular-xl',
		'a-font-secondary-regular-l',
		'a-font-secondary-regular-m',
		'a-font-secondary-regular-s',
		'a-font-body-bold-xxxl',
		'a-font-body-bold-xxl',
		'a-font-body-bold-xl',
		'a-font-body-bold-l',
		'a-font-body-bold-m',
		'a-font-body-bold-s',
		'a-font-body-regular-xxxl',
		'a-font-body-regular-xxl',
		'a-font-body-regular-xl',
		'a-font-body-regular-l',
		'a-font-body-regular-m',
		'a-font-body-regular-s',
	],

	dirt: [
		'a-font-primary-regular',
		'a-font-primary-regular-xl',
		'a-font-primary-regular-l',
		'a-font-primary-regular-m',
		'a-font-primary-regular-s',
		'a-font-primary-regular-xs',
		'a-font-secondary-medium',
		'a-font-secondary-medium-xl',
		'a-font-secondary-medium-l',
		'a-font-secondary-medium-m',
		'a-font-secondary-medium-s',
		'a-font-secondary-medium-xs',
		'a-font-secondary-regular',
		'a-font-secondary-regular-xl',
		'a-font-secondary-regular-l',
		'a-font-secondary-regular-m',
		'a-font-secondary-regular-s',
		'a-font-secondary-regular-xs',
		'a-font-body',
		'a-font-body-xl',
		'a-font-body-l',
		'a-font-body-m',
		'a-font-body-s',
		'a-font-body-xs',
	],

	sportico: [
		'a-font-primary-bold-xxl',
		'a-font-primary-bold-xl',
		'a-font-primary-bold-l',
		'a-font-primary-bold-m',
		'a-font-primary-bold-s',
		'a-font-primary-bold-xs',
		'a-font-primary-bold-xxs',
		'a-font-primary-medium-xxl',
		'a-font-primary-medium-xl',
		'a-font-primary-medium-l',
		'a-font-primary-medium-m',
		'a-font-primary-medium-s',
		'a-font-primary-medium-xs',
		'a-font-primary-medium-xxs',
		'a-font-primary-regular-xxl',
		'a-font-primary-regular-xl',
		'a-font-primary-regular-l',
		'a-font-primary-regular-m',
		'a-font-primary-regular-s',
		'a-font-primary-regular-xs',
		'a-font-primary-regular-xxs',
		'a-font-secondary-bold-xxl',
		'a-font-secondary-bold-xl',
		'a-font-secondary-bold-l',
		'a-font-secondary-bold-m',
		'a-font-secondary-bold-s',
		'a-font-secondary-bold-xs',
		'a-font-secondary-bold-xxs',
		'a-font-body-xxl',
		'a-font-body-xl',
		'a-font-body-l',
		'a-font-body-m',
		'a-font-body-s',
		'a-font-body-xs',
		'a-font-body-xxs',
	],

	variety: [
		'a-font-primary-regular-3xl',
		'a-font-primary-regular-2xl',
		'a-font-primary-regular-xl',
		'a-font-primary-regular-l',
		'a-font-primary-regular-m',
		'a-font-primary-regular-s',
		'a-font-primary-regular-xs',
		'a-font-primary-regular-2xs',
		'a-font-primary-regular-3xs',
		'a-font-primary-regular-4xs',
		'a-font-secondary-bold-3xl',
		'a-font-secondary-bold-2xl',
		'a-font-secondary-bold-xl',
		'a-font-secondary-bold-l',
		'a-font-secondary-bold-m',
		'a-font-secondary-bold-s',
		'a-font-secondary-bold-xs',
		'a-font-secondary-bold-2xs',
		'a-font-secondary-bold-3xs',
		'a-font-secondary-bold-4xs',
		'a-font-secondary-regular-3xl',
		'a-font-secondary-regular-2xl',
		'a-font-secondary-regular-xl',
		'a-font-secondary-regular-l',
		'a-font-secondary-regular-m',
		'a-font-secondary-regular-s',
		'a-font-secondary-regular-xs',
		'a-font-secondary-regular-2xs',
		'a-font-secondary-regular-3xs',
		'a-font-secondary-regular-4xs',
		'a-font-accent-3xl',
		'a-font-accent-2xl',
		'a-font-accent-xl',
		'a-font-accent-l',
		'a-font-accent-m',
		'a-font-accent-s',
		'a-font-accent-xs',
		'a-font-accent-2xs',
		'a-font-accent-3xs',
		'a-font-accent-4xs',
		'a-font-basic-3xl',
		'a-font-basic-2xl',
		'a-font-basic-xl',
		'a-font-basic-l',
		'a-font-basic-m',
		'a-font-basic-s',
		'a-font-basic-xs',
		'a-font-basic-2xs',
		'a-font-basic-3xs',
		'a-font-basic-4xs',
		'a-font-body-3xl',
		'a-font-body-2xl',
		'a-font-body-xl',
		'a-font-body-l',
		'a-font-body-m',
		'a-font-body-s',
		'a-font-body-xs',
		'a-font-body-2xs',
		'a-font-body-3xs',
		'a-font-body-4xs',
	],

	sheknows: [
		'a-font-primary-xxl',
		'a-font-primary-xl',
		'a-font-primary-l',
		'a-font-primary-m',
		'a-font-primary-s',
		'a-font-primary-xs',
		'a-font-secondary-bold-xxl',
		'a-font-secondary-bold-xl',
		'a-font-secondary-bold-l',
		'a-font-secondary-bold-m',
		'a-font-secondary-bold-s',
		'a-font-secondary-bold-xs',
		'a-font-secondary-regular-xxl',
		'a-font-secondary-regular-xl',
		'a-font-secondary-regular-l',
		'a-font-secondary-regular-m',
		'a-font-secondary-regular-s',
		'a-font-secondary-regular-xs',
		'a-font-accent-xxl',
		'a-font-accent-xl',
		'a-font-accent-l',
		'a-font-accent-m',
		'a-font-accent-s',
		'a-font-accent-xs',
		'a-font-basic-xxl',
		'a-font-basic-xl',
		'a-font-basic-l',
		'a-font-basic-m',
		'a-font-basic-s',
		'a-font-basic-xs',
		'a-font-body-xxl',
		'a-font-body-xl',
		'a-font-body-l',
		'a-font-body-m',
		'a-font-body-s',
		'a-font-body-xs',
	],
};

const brandNames = Object.keys( fontDataByBrand );

const allFontNames = brandNames
	.map( ( brand ) => {
		return fontDataByBrand[ brand ];
	} )
	.flat();

const uniqueFontNames = [ ...new Set( allFontNames ) ];

const fontNamesWithCounts = allFontNames.reduce( ( acc, curr ) => {
	if ( acc[ curr ] ) {
		acc[ curr ]++;
	} else {
		acc[ curr ] = 1;
	}

	return acc;
}, {} );

const fontNamesUsedOnce = Object.keys( fontNamesWithCounts ).reduce(
	( acc, curr ) => {
		if ( fontNamesWithCounts[ curr ] === 1 ) acc.push( curr );
		return acc;
	},
	[]
);

const fontNamesUsedThricePlus = Object.keys( fontNamesWithCounts ).reduce(
	( acc, curr ) => {
		if ( fontNamesWithCounts[ curr ] >= 3 ) acc.push( curr );
		return acc;
	},
	[]
);

const fontNamesUsedOnAll = brandNames.reduce( ( acc, curr ) => {
	if ( fontNamesWithCounts[ curr ] >= 5 ) acc.push( curr );
	return acc;
}, [] );

const report = {
	'Brands Analyzed': brandNames.length,
	'Unique Font Names': uniqueFontNames.length,
	'Names Used Once': fontNamesUsedOnce.length,
	'Names Used 3+ times': fontNamesUsedThricePlus.length,
	'Names Used On All': fontNamesUsedOnAll.length,
};

console.log( 'Font Naming Consistency Report' ); // eslint-disable-line no-console
console.table( report ); // eslint-disable-line no-console
