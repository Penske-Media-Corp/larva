const app = require( './server' );

const port = process.env.NODE_PORT || 3000;

app.listen( port, () => {
	// eslint-disable-next-line no-console
	console.log( 'Larva server is listening on port ' + port );
} );
