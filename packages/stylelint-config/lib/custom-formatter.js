const string = require( 'stylelint' ).formatters.string;
const fs = require( 'fs' );
const path = require( 'path' );

module.exports = function ( results ) {
	const styleLintPath = path.resolve(
		`${ process.cwd() }/pmc.stylelintrc.json`
	);

	// eslint-disable-next-line no-unused-vars, @wordpress/no-unused-vars-before-return
	const additionalStyleLint = fs.existsSync( styleLintPath );

	const propertiesForCustomMessage = JSON.parse(
		fs.readFileSync( styleLintPath )
	).messages;

	results.forEach( ( error ) => {
		error.warnings.forEach( ( x ) => {
			const matchedMessage = propertiesForCustomMessage.filter(
				( msg ) => {
					const regex = new RegExp( msg.property );
					return regex.test( x.text );
				}
			);

			if ( matchedMessage.length ) {
				x.text = matchedMessage[ 0 ].message;
			}
		} );
	} );

	return string( results );
};
