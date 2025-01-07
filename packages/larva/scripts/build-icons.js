'use strict';

const SVGSpriter = require( 'svg-sprite' );
const path = require( 'path' );
const mkdirp = require( 'mkdirp' );
const globby = require( 'globby' );
const fs = require( 'fs' );
const svgoConfig = require( './config/svgo-config.json' );

const projectIconsPath = path.join( process.cwd(), './src/svg/icons' );
const larvaIconsPath = path.join(
	process.cwd(),
	'./node_modules/@penskemediacorp/larva-svg/src'
);

// TODO: unfinished feature
// const getSassVarsString = require( './lib/getSassVarsString' );

const config = {
	dest: 'build/svg',
	log: null, // No logging
	mode: {
		defs: {
			example: true,
			sprite: 'sprite.defs.svg',
		},
	},
	shape: {
		id: {
			separator: '',
		},
		transform: {
			svgo: svgoConfig,
		},
	},
	svg: {
		dimensionAttributes: false,
	},
};

const spriter = new SVGSpriter( config );

const svgFiles = globby.sync( [ larvaIconsPath, projectIconsPath ], {
	expandDirectories: {
		extensions: [ 'svg' ],
	},
} );

// TODO: unfinished feature
// let scssIcons = {};

// eslint-disable-next-line no-console
console.log(
	`Looking for icon SVGs in ${ path.relative(
		process.cwd(),
		larvaIconsPath
	) } and ${ path.relative( process.cwd(), projectIconsPath ) }...`
);

svgFiles.forEach( ( file ) => {
	// TODO: unfinished feature.
	// Build Sass vars object
	// scssIcons[ path.basename( file, '.svg' ) ] = fs.readFileSync( file, { encoding: 'utf-8' } );

	spriter.add(
		file,
		path.basename( file ),
		fs.readFileSync( file, { encoding: 'utf-8' } )
	);
} );

// eslint-disable-next-line no-console
console.log( 'Building SVG icon sprite...' );

// Write the Sass variables.
// TODO: unfinished feature.
// fs.writeFileSync( path.join( process.cwd(), './build/a-icon-svg.scss' ), getSassVarsString( scssIcons ) );

// Compile the sprite
spriter.compile( function ( error, result ) {
	// Run through all configured output modes
	for ( const mode in result ) {
		// Run through all created resources and write them to disk
		for ( const type in result[ mode ] ) {
			mkdirp.sync( path.dirname( result[ mode ][ type ].path ) );
			fs.writeFileSync(
				result[ mode ][ type ].path,
				result[ mode ][ type ].contents
			);
		}
	}

	// eslint-disable-next-line no-console
	console.log( 'Completed building SVG icon sprite.' );
} );
