const path = require( 'path' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );

const getConfig = require( '../../index' ).getConfig;

const SRC_DIR = path.resolve( './entries' );
const BUILD_DIR = path.resolve( './build/js' );

const entries = getConfig( 'webpack' ).entries;

const aliases = {
	'@larva-js': path.resolve( './node_modules/@penskemediacorp/larva-js/src' ),
	'@npm': path.resolve( './node_modules/' ),
	...getConfig( 'webpack' ).aliases,
};

const eslintConfig = getConfig( 'eslint', true );
const eslintConfigFile =
	undefined !== eslintConfig ? eslintConfig.configFile : null;

// Tools
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

//=========================================================
//  Rules
//---------------------------------------------------------
const rules = {
	/**
	 * JS Loaders
	 */
	pre: {
		test: /\.js$/,
		exclude: /(node_modules|nobundle|vendor)/,
	},
	js: {
		test: /\.js$/,
		include: SRC_DIR,
		exclude: /(node_modules|nobundle|vendor)/,
		loader: 'babel-loader',
		options: {
			presets: [ '@babel/preset-env' ],
		},
	},
};

const plugins = {
	cleanup: new CleanWebpackPlugin(),
	eslint: new ESLintPlugin( {
		overrideConfigFile: eslintConfigFile,
	} ),
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {
	entry: entries,
	output: {
		path: BUILD_DIR,
		filename: '[name].js',
	},
	module: {
		rules: [ rules.js ],
	},
	watch: false,
	watchOptions: {
		ignored: /node_modules/,
	},
	resolve: {
		alias: aliases,
	},
	optimization: {
		minimize: true,
	},
};

module.exports = ( env, argv ) => {
	if ( 'development' === argv.mode ) {
		config.devtool = 'source-map';
		config.module.rules = ( config.module.rules || [] ).concat( [
			rules.pre,
		] );
		config.plugins = [ plugins.eslint ];
	}

	if ( 'production' === argv.mode ) {
		// eslint-disable-next-line no-console
		console.log( 'Building Prod JS..' );

		config.module.rules = ( config.module.rules || [] ).concat( [
			rules.pre,
		] );
		config.plugins = [ plugins.eslint, plugins.cleanup ];
	}

	return config;
};
