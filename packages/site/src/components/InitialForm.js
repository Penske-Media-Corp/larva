import { Link } from 'react-router-dom';

import React, { Fragment } from 'react';
import { brands } from '../data';

export const InitialForm = ( {
	fetchAndSetTokens,
	handleUpdateBrand,
	selectedBrand,
	appActions,
} ) => {
	return (
		<Fragment>
			<p className="lrv-u-font-size-18">
				Choose from the following options for working with Design
				Tokens.
			</p>

			<form className="lrv-a-grid lrv-a-cols2">
				<div className="lrv-a-space-children-vertical lrv-a-space-children--1">
					<h2>Update a Brand&apos;s Tokens</h2>
					<p className="lrv-u-font-size-18">
						Select the brand you would like to update:
					</p>
					<select
						className="lrv-u-display-block lrv-u-padding-a-050 lrv-u-margin-b-2 lrv-u-border-a-1 lrv-u-border-radius-5"
						name="select"
						onChange={ ( e ) => {
							handleUpdateBrand(
								e.target.value,
								appActions.update
							);
						} }
					>
						<option key="select">Select</option>
						{ brands.map( ( brand ) => (
							<option key={ brand } value={ brand }>
								{ brand }
							</option>
						) ) }
					</select>

					<Link to={ `/tokens/update` }>
						<button
							className="ui primary button lrv-u-display-inline-block"
							type="submit"
							onClick={ fetchAndSetTokens }
							disabled={
								! ( appActions.update === selectedBrand.action )
							}
						>
							Continue to Update Tokens
						</button>
					</Link>
				</div>

				<div className="lrv-a-space-children-vertical lrv-a-space-children--1">
					<h2>Create Tokens for a New Brand</h2>
					<p className="lrv-u-font-size-18">
						Enter the name of the brand in all lowercase, one word
						text:
					</p>

					<div className="ui input">
						<input
							type="text"
							placeholder="artnews"
							onChange={ ( e ) => {
								handleUpdateBrand(
									e.target.value,
									appActions.create
								);
							} }
						/>
					</div>

					<p className="lrv-u-color-grey">
						e.g. billboard, variety, rollingstone, artinamerica,
						sheknows
					</p>

					<div className="lrv-u-display-block">
						<Link to="/tokens/create">
							<button
								className="ui primary button lrv-u-display-inline-block"
								type="submit"
								disabled={
									! (
										appActions.create ===
										selectedBrand.action
									)
								}
								onClick={ fetchAndSetTokens }
							>
								Continue to Create Tokens
							</button>
						</Link>
					</div>
				</div>
			</form>
		</Fragment>
	);
};
