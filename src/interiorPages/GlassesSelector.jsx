import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { itemsFetchData } from '../actions/Items'
import SelectionLayout from '../components/SelectionLayout'
import ProductDetails from '../components/ProductDetails'

class GlassesSelector extends Component {

	componentDidMount() {
		if (window.location.hostname.indexOf("localhost") > -1 || window.location.hostname.indexOf("local") > -1) {
			this.props.fetchData('./eyewear.json')
		} else {
			this.props.fetchData('https://5ba39c558da2f20014654c4d.mockapi.io/eyeware')
		}
	}

	getMainContent() {

	}

	render() {
		return (
			<Fragment>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Products - JIANA</title>
				</Helmet>
				<main className="container glasses-selector">
		      {(() => {
						if (this.props.hasErrored) {
							return <h1>There was an error<br />loading the items.</h1>
						} else if (this.props.isLoading) {
							return <h1>Loading...</h1>
						} else if (this.props.items.length !== 0) {
							return (
								<div className="row">
									<div className="col">
										<ProductDetails />
										<SelectionLayout />
									</div>
								</div>
							)
						}
		      })()}
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.items,
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchData: (url) => dispatch(itemsFetchData(url)) // itemsFetchData is method in ./actions/Items.js   method imported top of doc
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GlassesSelector)