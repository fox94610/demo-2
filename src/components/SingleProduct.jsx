import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateCurrentProduct } from '../actions/UpdateCurrentProduct'
import { isEmpty } from 'lodash'
import { TweenMax, Power4 } from 'gsap'
const $ = require('jquery')


class SingleProduct extends Component {

	constructor(props) {
		super(props)
		this.animateIn = this.animateIn.bind(this)
		this.startAnimeTimer = this.startAnimeTimer.bind(this)
		this.onProdSelect = this.onProdSelect.bind(this)
	}

	componentDidMount() {
		this.thisElem = $('.single-product-'+this.props.index)
		this.mask = $('.mask-'+this.props.index)
		this.animator = $('.animator-'+this.props.index)
		this.animeLine = $('.anime-line-prod-'+this.props.index)
		this.startAnimeTimer()
	}

	componentDidUpdate() {
		// Catch state change [details showing] -> [no details showing]
		if (!this.detailsVisible && this.previoiusDetailsVisible) {
			this.startAnimeTimer()
		}
	}

	startAnimeTimer() {
		this.thisElem.css('pointer-events', 'none')
		TweenMax.set(this.animator, {y:200})
		setTimeout(this.animateIn, 900)
	}

	animateIn() {
		const self = this

		// Line tween in
		TweenMax.set(this.animeLine, {width: "0%", opacity:1})
		TweenMax.to(this.animeLine, 0.4, {delay: 0.1*(this.props.index+1), width: "100%", ease:Power4.easeOut})

		// Push up reveal 
		TweenMax.set(this.animator, {y:this.thisElem.height()})
		TweenMax.to(self.animator, 0.4, {delay: 0.3+(0.1*(self.props.index+1)), y:0, ease:Power4.easeOut})

		// Line fade out
		TweenMax.to(this.animeLine, 0.1, {delay: 0.3+(0.1*(self.props.index+1)), opacity:0, ease:Power4.easeOut, onComplete:()=>{
			this.thisElem.css('pointer-events', 'auto')
		}})
	}

	onProdSelect() {
		this.props.updateCurrentProduct(this.props.productData)
		$('html, body').animate({
			scrollTop : 0
		}, 100)
	}

	render() {
		this.previoiusDetailsVisible = this.detailsVisible
		this.detailsVisible = !isEmpty(this.props.currentProduct)

		const { images, name, brand, id } = this.props.productData

		let coreClasses = "col-sm single-product single-product-" + this.props.index
		coreClasses = id === this.props.currentProduct.id ? coreClasses + " is-selected" : coreClasses

		return (
			<div className={coreClasses} onClick={this.onProdSelect}>
				<div className={"mask mask-"+this.props.index}>
					<div className={"animator-"+this.props.index}>
						<img src={images['frontal-sm']} alt={name} />
						<div className="brand">{brand}</div>
						<div className="name">{name}</div>
					</div>
					<div className={"anime-line-prod anime-line-prod-"+this.props.index} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentProduct: state.currentProduct
	}
}

const mapDispatchToProps = dispatch => ({
  updateCurrentProduct: (prod) => dispatch(updateCurrentProduct(prod))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)