const gulp = require( 'gulp' );
const gulpClean = require( 'gulp-clean' );
const gulpIf = require( 'gulp-if' );
const gulpIgnore = require( 'gulp-ignore' );
const gulpPostCss = require( 'gulp-postcss' );
const gulpRename = require( 'gulp-rename' );
const gulpStylelint = require( 'gulp-stylelint' );

const globImporter = require( 'node-sass-glob-importer' );
const { mkdirpSync } = require( 'fs-extra' );
const path = require( 'path' );
const postCss = require( 'postcss' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );

const stylelintConfig = require( './stylelint.config' );

/**************
Config
**************/

const cssDest = './build/css/';

sass.compiler = require( 'sass' );

const sassOpts = {
	includePaths: [
		path.resolve( './node_modules' ),
		path.resolve( './src/scss' ),
	],
	importer: globImporter(),
};

const stylelintOpts = {
	failAfterError: false,
	config: stylelintConfig,
	reporters: [
		{
			formatter: 'string',
			console: true,
		},
	],
};

/**************
Functions
**************/

/**
 * Build CSS.
 *
 * Used for both prod and dev commands.
 *
 * Consider updating the name 'minify' to 'post' if/when
 * more Post CSS functionality is added.
 *
 * @param {Function} done                      Post-build callback.
 * @param {boolean}  minify                    Run post CSS and minify output.
 * @param {boolean}  generateImportantVariants Whether to build variations with
 *                                             `!important` added to all rules.
 */
const buildScss = (
	done,
	minify = false,
	generateImportantVariants = false
) => {
	if ( minify ) {
		sassOpts.outputStyle = 'compressed';
	}

	gulp.src( './entries/*.scss' )
		.pipe( gulpStylelint( stylelintOpts ) )
		.pipe( sass( sassOpts ).on( 'error', sass.logError ) )
		.pipe( gulp.dest( cssDest ) )
		.pipe( gulpIgnore.exclude( 'larva-ui.css' ) )
		.pipe(
			gulpIf(
				generateImportantVariants,
				gulpPostCss( [ declareImportanceForAll ] )
			)
		)
		.pipe(
			gulpIf(
				generateImportantVariants,
				gulpRename( { suffix: '-important' } )
			)
		)
		.pipe( gulpIf( generateImportantVariants, gulp.dest( cssDest ) ) );

	done();
};

/**
 * Prepare destination directory.
 *
 * @param {Function} done Function called upon completion.
 */
const clean = ( done ) => {
	gulp.src( cssDest, { read: false } ).pipe( gulpClean() );

	mkdirpSync( cssDest );
	done();
};

/**
 * Build a task from dynamic input.
 *
 * @param {Function} done                      Function called upon completion.
 * @param {boolean}  generateImportantVariants Whether to build variations with
 *                                             `!important` added to all rules.
 */
const composeTask = ( done, generateImportantVariants = false ) => {
	clean( () => {
		stylelint( './src/**/*.scss' );
		buildScss( done, true, generateImportantVariants );
	} );
};

/**
 * Add `!important` declarations to all rules, for use with older themes that
 * have high specificity.
 *
 * Adapted from the `postcss-importantly` npm package, updated to work with
 * latest version of PostCSS.
 *
 * @param {Object} style  PostCSS Root object for current CSS.
 * @param {Object} result PostCSS Result object containing transformed CSS.
 * @return {Object} PostCSS Result object.
 */
const declareImportanceForAll = ( style, result ) => {
	const root = postCss.parse( style );

	root.walkRules( ( rule ) => {
		if ( 'atrule' === rule.parent.type && 'media' !== rule.parent.name ) {
			return;
		}

		return rule.each( ( decl ) => {
			if ( ! decl.value || decl.important ) {
				return;
			}

			decl.value += '!important';

			return decl;
		} );
	} );

	result.root = root;

	return result;
};

/**
 * Run stylelint.
 *
 * @param {string} file Filename or glob to process.
 */
const stylelint = ( file ) => {
	gulp.src( file ).pipe( gulpStylelint( stylelintOpts ) );
};

/**************
Tasks
***************/

// Watch the changed file, compile and lint when changed.
exports[ 'dev-scss' ] = () => {
	gulp.watch( [ './src/**/*.scss', './entries/*.scss' ], buildScss ).on(
		'change',
		function ( file ) {
			stylelint( file );
		}
	);
};

// Quickly build SCSS.
exports[ 'build-scss' ] = ( done ) => {
	buildScss( done );
};

// Run PostCSS on CSS.
exports[ 'prod-scss' ] = ( done ) => {
	composeTask( done );
};

exports[ 'prod-scss-with-important-variants' ] = ( done ) => {
	composeTask( done, true );
};
