const path = require( 'path' );
const express = require( 'express' );
const { marked } = require( 'marked' );
const fs = require( 'fs' );
const globby = require( 'globby' );

const {
	TwingEnvironment,
	TwingLoaderFilesystem,
	TwingFilter,
	TwingFunction,
} = require( 'twing' );

const fontData = require( '../../larva-tokens/lib/font-data' );

const getAppConfiguration = require( './utils/getAppConfiguration' );
const getPatternPathsToLoad = require( './utils/getPatternPathsToLoad' );
const getPatternData = require( './utils/getPatternData' );
const getAllPatternsObj = require( './utils/getAllPatternsObj' );

const app = express();

const patternConfig = getAppConfiguration( 'patterns' );
const brandConfig = getAppConfiguration( 'brand' );
const assetsConfig = getAppConfiguration( 'assets' );
const themeAssetsConfig = getAppConfiguration( 'themeAssets' );
const twigPaths = getPatternPathsToLoad( patternConfig );

const loader = new TwingLoaderFilesystem( twigPaths );

// Add markdown filter
const markdownFilter = new TwingFilter( 'markdown', ( string ) => {
	if ( string ) {
		return Promise.resolve( marked( string ) );
	}
	const noDocsMessage =
		"**This needs docs!** <br>Create a README.md in the pattern's directory and add details about using this pattern in markdown.";

	return Promise.resolve( marked( noDocsMessage ) );
} );

// Support `{{ item|markup }}` syntax for outputting escaped content within loops.
const markupFilter = new TwingFilter(
	'markup',
	( string ) => Promise.resolve( string ),
	{},
	{ is_safe: [ 'html' ] }
);

const kebabify = ( name ) => {
	const kebabCase = [];

	// TODO: find a more concise way of turning a string into an iterable
	for ( let i = 0; i < name.length; i++ ) {
		const letter = name[ i ];
		kebabCase[ i ] = letter;
	}

	return kebabCase.reduce( ( a, b ) => {
		if ( '_' === b ) {
			return a.toLowerCase() + '-';
		}
		return a.toLowerCase() + b.toLowerCase();
	} );
};

// TODO: Could be an array/iterator if the namespace can be extracted from the key, the larva.config API could
// change to `patterns: { larva: /larva/path/here/, project: /project/path/here }`
loader.addPath( patternConfig.larvaPatternsDir, 'larva' );

if ( fs.existsSync( patternConfig.projectPatternsDir ) ) {
	loader.addPath( patternConfig.projectPatternsDir, 'project' );
}

const twing = new TwingEnvironment( loader, { debug: true } );

twing.addFilter( markdownFilter );
twing.addFilter( markupFilter );

// Add custom function support for doing wp action: {{ wp_action( ... ) }}
twing.addFunction(
	new TwingFunction( 'wp_action', () => {
		// We're relying on twig-to-php-parser for translation, so just return empty string for now
		return Promise.resolve( '' );
	} )
);

const patterns = {
	larva: getAllPatternsObj( patternConfig.larvaPatternsDir ),
	project: getAllPatternsObj( patternConfig.projectPatternsDir ),
};

// Use the project version if it exists, else use the larva version
if ( fs.existsSync( assetsConfig.path ) ) {
	app.use( '/assets', express.static( assetsConfig.path ) );
}

// Expose any theme directories with assets in the express server
const themeAssetKeys = Object.keys( themeAssetsConfig );

themeAssetKeys.forEach( ( key ) => {
	app.use(
		'/assets/theme/' + key,
		express.static( themeAssetsConfig[ key ] )
	);
} );

app.use( '/:source?/css', function ( req, res ) {
	/**
	 * Generate Larva CSS Docs
	 *
	 * (Something similar can be done for project CSS unless we eradicate it)
	 *
	 * 1. Get all CSS from the larva-css npm package.
	 * 2. Use PostCSS to generate an abstract syntax tree.
	 * 3. Generate a "spec" for the CSS by getting the base selector names
	 *    from Sass files in larva-scss
	 * 4. Walk the rules in the AST, checking the selectors against keys
	 *    in the spec object, and adding them to an array of
	 *    selectors for each property. Mark if it is in the hasTokens array.
	 * 5. Send that spec object to the template.
	 */

	const postcss = require( 'postcss' );
	const cssPath = path.join(
		process.cwd(),
		'./node_modules/@penskemediacorp/larva/build/css/larva.css'
	);
	const sassPath = path.join(
		process.cwd(),
		'./node_modules/@penskemediacorp/larva-css/src/'
	);

	const hasTokens = [
		'u-background-color',
		'u-border-color',
		'u-color',
		'u-font-family',
		'u-letter-spacing',
		'u-margin',
		'u-padding',
	];

	const baseNames = ( () => {
		const files = globby.sync( sassPath, {
			expandDirectories: {
				files: [ '*.scss' ],
			},
		} );

		return files.map( ( item ) => {
			const parts = item.split( '/' );
			const baseName = parts[ parts.length - 1 ].split( '.' );
			return baseName[ 0 ];
		} );
	} )();

	const cssString = fs.readFileSync( cssPath );

	const cssRoot = postcss.parse( cssString );

	const generatedSpec = ( () => {
		const obj = {};

		baseNames.forEach( ( item ) => {
			obj[ item ] = {
				selectors: [],
				tokens: false,
			};
		} );

		return obj;
	} )();

	cssRoot.walkRules( ( rule ) => {
		Object.keys( generatedSpec ).forEach( ( key ) => {
			const regex = new RegExp( '.*lrv-' + key + '.*', 'g' );

			if ( -1 !== hasTokens.indexOf( key ) ) {
				generatedSpec[ key ].tokens = true;
			}

			if ( rule.selector.match( regex ) ) {
				generatedSpec[ key ].selectors.push( rule.selector );
			}
		} );
	} );

	req.params.name = 'Larva CSS';
	req.params.spec = generatedSpec;

	req.params.source = 'larva';
	req.params.pattern_nav = patterns;

	twing
		.render( 'css.html', req.params )
		.then( ( output ) => res.end( output ) );
} );

app.get( '/:source/:type/:name/:variant?', function ( req, res ) {
	let patternsPath;

	if ( 'larva' === req.params.source ) {
		patternsPath = patternConfig.larvaPatternsDir;
	} else if ( 'project' === req.params.source ) {
		patternsPath = patternConfig.projectPatternsDir;
	} else if ( 'assets' === req.params.source ) {
		return res.end();
	}

	// Support query parameters for conditionally loading stylesheets and scripts
	req.params.query = req.query;
	req.params.pattern_nav = patterns;
	req.params.data =
		undefined !== patternsPath
			? getPatternData( patternsPath, req.params )
			: null;
	req.params.brand = req.query.tokens ? req.query.tokens : brandConfig;
	req.params.variants =
		patterns[ req.params.source ][ req.params.type ][ req.params.name ];

	if ( 'algorithms' !== req.params.type ) {
		req.params.json_pretty = JSON.stringify( req.params.data, null, '\t' );
	}

	twing
		.render( 'pattern.html', req.params )
		.then( ( output ) => {
			res.end( output );
		} )
		.catch( ( e ) => {
			const errorMessage = `Cannot render template! \n\n${ e }`;

			// eslint-disable-next-line no-console
			console.log( e );

			res.end( errorMessage );
		} );
} );

app.get( '/:source?/style-guide', function ( req, res ) {
	const brand = req.query.tokens ? req.query.tokens : brandConfig;
	const tokensPath = path.join( assetsConfig.path, 'build/tokens' );

	const tokensData = ( () => {
		try {
			return require( path.join( tokensPath, `${ brand }.json` ) );
		} catch ( e ) {
			return null;
		}
	} )();

	const colorsByProperty = ( () => {
		if ( ! tokensData ) return;

		const colorTokens = Object.keys( tokensData ).filter( ( item ) =>
			item.includes( 'COLOR' )
		);
		const colorNames = colorTokens.map( ( token ) => kebabify( token ) );

		return colorNames.reduce(
			( acc, curr ) => {
				Object.keys( acc ).forEach( ( key ) => {
					if ( curr.startsWith( key ) ) {
						acc[ key ].push( 'lrv-u-' + curr );
					}
				} );

				return acc;
			},
			{
				color: [],
				'background-color': [],
				'border-color': [],
			}
		);
	} )();

	req.params.name = `Style Guide`;
	req.params.font_styles = fontData.groupedSelectors;
	req.params.colors = colorsByProperty;
	req.params.brand = req.query.tokens ? req.query.tokens : brandConfig;
	req.params.pattern_nav = patterns;

	twing
		.render( 'style-guide/index.html', req.params )
		.then( ( output ) => res.end( output ) )
		.catch( ( e ) => {
			const errorMessage = `Cannot render template! \n\n${ e }`;

			// eslint-disable-next-line no-console
			console.log( e );

			res.end( errorMessage );
		} );
} );

app.get( '/:source?/:type?', function ( req, res ) {
	req.params.source = 'larva';
	req.params.type = req.params.type;
	req.params.pattern_nav = patterns;
	req.params.brand = req.query.tokens ? req.query.tokens : brandConfig;
	twing
		.render( 'index.html', req.params )
		.then( ( output ) => res.end( output ) );
} );

module.exports = app;
