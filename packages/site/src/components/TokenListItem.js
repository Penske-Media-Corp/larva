import { useState } from 'react';

export const TokenListItem = ( {
	tokenName,
	tokenData,
	updateTokenValue,
	coreColorTokens,
	updateCoreColors,
} ) => {
	const [ tokenPreviewValue, setTokenPreviewValue ] = useState(
		tokenData.value
	);
	const [ confirmingCoreColorChange, setConfirmingCoreColorChange ] =
		useState( '' );

	const coreColorKey = tokenData.name.split( 'COLOR_' )[ 1 ];

	const isUsingCoreColor = () => {
		return (
			'core-color' !== tokenData.category &&
			coreColorTokens.hasOwnProperty( coreColorKey )
		);
	};

	const onClick = ( tokenValue ) => {
		setTokenPreviewValue( tokenValue );
		updateTokenValue( tokenData, tokenValue );
		setConfirmingCoreColorChange( '' );
		updateCoreColors();
	};

	return (
		<li
			className="lrv-u-display-block lrv-u-margin-b-1 lrv-a-glue-parent"
			key={ tokenName }
		>
			<div className="ui labeled input">
				<span className="ui label">
					{ tokenName }
					{ isUsingCoreColor() ? (
						<i className="lrv-u-padding-l-050 circle icon"></i>
					) : (
						''
					) }
				</span>
				<br />
				<input
					defaultValue={ tokenData.value }
					onChange={ ( e ) => {
						if ( ! isUsingCoreColor() ) {
							updateTokenValue( tokenData, e.target.value );
							setTokenPreviewValue( e.target.value );
						} else {
							setConfirmingCoreColorChange( e.target.value );
						}
					} }
				/>
				{ 'color' === tokenData.type ? (
					<div
						className="lrv-u-width-30 lrv-u-flex-shrink-0 lrv-u-border-a-1 lrv-u-margin-l-050"
						style={ { backgroundColor: tokenPreviewValue } }
					></div>
				) : (
					''
				) }
			</div>

			{ confirmingCoreColorChange && (
				<div
					className="lrv-a-glue"
					style={ { '--a-glue-left': '50%' } }
				>
					<div className="ui card lrv-u-width-300">
						<div className="lrv-u-padding-a-1">
							<p className="lrv-u-margin-t-050">
								Changing this token will &quot;unlink&quot;{ ' ' }
								<code>{ coreColorKey }</code>, so it can no
								longer be centrally managed from &quot;Core
								Colors&quot;. Please confirm this change.
							</p>
							<div className="ui two buttons">
								<button
									className="ui basic green button"
									onClick={ () => {
										onClick( confirmingCoreColorChange );
									} }
								>
									Confirm
								</button>
								<button
									className="ui basic red button"
									onClick={ () => {
										onClick( tokenData.value );
									} }
								>
									Discard
								</button>
							</div>
						</div>
					</div>
				</div>
			) }
		</li>
	);
};
