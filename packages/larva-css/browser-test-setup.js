function describe( testString, tests ) {
	console.group( testString );
	tests();
	console.groupEnd();
}

function it( testString, test ) {
	const testResult = test();
	const color = false === testResult.result ? 'red' : 'green';

	console.log(
		`%c ${ testString } ${ testResult.message }`,
		`color:${ color }`
	);
}

function assertEquals( value1, value2 ) {
	let message = '';
	const expression = value1 % value2 < 1;

	if ( false === expression ) {
		message = '\n \t Fail: ' + ( value1 % value2 ).toFixed( 1 );
	}

	return {
		result: expression,
		message,
	};
}
