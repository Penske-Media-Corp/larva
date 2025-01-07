const path = require( 'path' );
const chalk = require( 'chalk' );
const { copySync } = require( 'fs-extra' );

const copyFrom = path.join( __dirname, 'larva' );
const copyTo = process.cwd();

copySync( copyFrom, copyTo );

// eslint-disable-next-line no-console
console.log(
	chalk.green(
		'Copied folder structure. Now, add the following scripts to package.json:'
	)
);

// eslint-disable-next-line no-console
console.log( `
"backstop": "backstop --config=node_modules/@penskemediacorp/backstopjs-config",
"build-html": "larva build-html",
"larva": "larva server --watch src -e twig,js,html",
"parser": "./node_modules/.bin/twig-to-php-parser",
"update-larva": "npm install @penskemediacorp/larva@latest",
"write-json": "larva write-json"
` );
