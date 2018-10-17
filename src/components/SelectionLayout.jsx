import React, {Component} from 'react'
import { connect } from 'react-redux'
import SingleProduct from './SingleProduct'
import { TweenMax, Power4 } from 'gsap'
import { isEmpty } from 'lodash'
const $ = require('jquery')

class SelectionLayout extends Component {

	constructor(props) {
		super(props)
		this.animateIn = this.animateIn.bind(this)
	}

	componentDidMount() {
		this.headline = $('.headline')
		this.animeLine = $('.anime-line')
		this.thisComp = $('.selection-layout')
		TweenMax.set(this.headline, {y:200})
		setTimeout(this.animateIn, 300)
	}

	componentDidUpdate() {
		// Catch state change [no details] -> [details showing]
		if (this.detailsVisible && !this.previoiusDetailsVisible) {
			this.delayReveal()
		}
		// Catch state change [no details] -> [no details showing]
		if (!this.detailsVisible && this.previoiusDetailsVisible) {
			this.animateIn()
		}
	}

	delayReveal() {
		TweenMax.set(this.thisComp, {opacity:0})
		TweenMax.to(this.thisComp, 1, {delay: 1.5, opacity:1})
	}


	animateIn() {

		// Line tween in
		TweenMax.set(this.animeLine, {width: "1%", opacity:1})
		TweenMax.to(this.animeLine, 0.4, {width: "100%", ease:Power4.easeOut})

		// Push up reveal
		TweenMax.set(this.headline, {y:200})
		TweenMax.to(this.headline, 0.5, {delay: 0.6, y:0, ease:Power4.easeOut})

		// Line fade out
		TweenMax.to(this.animeLine, 0.8, {delay: 0.5, opacity:0, ease:Power4.easeOut})
	}


	render() {
		this.previoiusDetailsVisible = this.detailsVisible
		this.detailsVisible = !isEmpty(this.props.currentProduct)

		const headlineClass = isEmpty(this.props.currentProduct) ? "headline" : "headline prod-selected"

		return (
			<div className="selection-layout">
				<div className="headline-mask">
					<h2 className={headlineClass}>Select Your Eyewear</h2>
					<div className="anime-line" />
				</div>
				<div className="products">
	        <div className="container">
	          <div className="row">
							{ this.props.eyewear && this.props.eyewear.map( (product, i) => 
								(<SingleProduct key={product.id} productData={product} index={i} />)
								)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		eyewear: state.items.eyewear,
		currentProduct: state.currentProduct
	}
}

export default connect(mapStateToProps)(SelectionLayout)

