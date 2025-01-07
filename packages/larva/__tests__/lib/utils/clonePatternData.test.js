const path = require( 'path' );
const clonePatternData = require( '../../../lib/utils/clonePatternData' );
const getConfig = require( '../../../lib/utils/getAppConfiguration' );
const { projectPatternsDir, larvaPatternsDir } = getConfig( 'patterns' );

describe( 'clonePatternData', () => {
	it( 'gets object from project patterns dir first', () => {
		const expected = require(
			path.join(
				projectPatternsDir,
				'/components/c-tagline/c-tagline.prototype'
			)
		);
		const c_tagline = clonePatternData(
			'components/c-tagline/c-tagline.prototype'
		);

		expect( c_tagline ).toStrictEqual( expected );
	} );

	it( 'falls back to object from larva patterns dir', () => {
		const expected = require(
			path.join(
				larvaPatternsDir,
				'/components/c-button/c-button.prototype'
			)
		);
		const c_button = clonePatternData(
			'components/c-button/c-button.prototype'
		);

		expect( c_button ).toStrictEqual( expected );
	} );
} );
