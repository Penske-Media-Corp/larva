const path = require( 'path' );

const getAppConfiguration = require( '../lib/utils/getAppConfiguration' );
const getArgsFromCli = require( '../lib/utils/getArgsFromCli' );
const generateStatic = require( '../lib/generateStatic' );
const getPatternRoutes = require( '../lib/utils/getPatternRoutes' );
const getAllPatternsObj = require( '../lib/utils/getAllPatternsObj' );

const config = getAppConfiguration( 'patterns' );
const cliArgs = getArgsFromCli();
const source = 'larva' === cliArgs[ 1 ] ? 'larva' : 'project';
const port = process.env.NODE_PORT || '3000';

const urlBase = 'http://localhost:' + port + '/' + source;
const buildPath = path.join( process.cwd(), './build/html/' + source );

const patternsObj = ( () => {
	const patternDir =
		'larva' === source
			? config.larvaPatternsDir
			: config.projectPatternsDir;
	return getAllPatternsObj( patternDir );
} )();

const routesArr = getPatternRoutes( patternsObj );

// Add a static, non-pattern paths.
const staticPaths = [
	'css',
	'style-guide',
	'components',
	'objects',
	'modules',
	'',
];

staticPaths.forEach( ( p ) => {
	// Only build these paths for the larva source.
	if ( p === 'style-guide' || p === 'css' ) {
		if ( 'larva' !== source ) {
			return;
		}
	}

	routesArr.push( p );
} );

generateStatic(
	routesArr,
	buildPath,
	( message ) => {
		// TODO: copy assets into build path
		// copy assets from larva package to static
		// copy assets from project to assets
		// eslint-disable-next-line no-console
		console.log( message );
	},
	urlBase
);
