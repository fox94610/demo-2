import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { confirmAlert } from 'react-confirm-alert'
import { TweenMax, Expo} from 'gsap'
import 'react-confirm-alert/src/react-confirm-alert.css'
const $ = require('jquery')

class ProductDetails extends Component {

	constructor(props) {
		super(props)
		this.buyClick = this.buyClick.bind(this)
		this.confirmBuySuccess = this.confirmBuySuccess.bind(this)
		this.confirmBuyFailure = this.confirmBuyFailure.bind(this)
		this.prodToProdAnime = this.prodToProdAnime.bind(this)
	}

	componentDidUpdate() {
		this.selectionLayout = $('.selection-layout')
		this.productDetails = $('.product-details')
		this.animeLine = $('.anime-line-brand')
		this.brandMask = $('.brand-mask')
		this.brand = $('.brand')
		this.elements = [
			$('.name'),
			$('.price'),
			$('.description'),
			$('.form-holder')
		]

		// Catch change [product] -> [another product]
		this.previousProd = this.currentViewProd
		this.currentViewProd = this.props.currentProduct
		if (this.currentViewProd !== this.previousProd && this.hasProductInfo) {
			this.prodToProdAnime()
		}
	}

	prodToProdAnime() {

		this.productDetails.css('height', 'auto')

		// Glass filter anime
		TweenMax.set('.glasses-large', { '-webkit-filter': 'brightness(1) blur(18px) hue-rotate(160deg) saturate(11)' });
		TweenMax.to('.glasses-large', 1, { '-webkit-filter': 'brightness(1) blur(0px) hue-rotate(0deg) saturate(1)' });

		// Line tween in
		TweenMax.set(this.animeLine, {width: "0%", opacity:1})
		TweenMax.to(this.animeLine, 0.4, {delay: 0.4, width: "80%", ease:Expo.easeOut})

		// Push up reveal
		this.brandMask.css('overflow', 'hidden')
		TweenMax.set(this.brand, {y:200})
		TweenMax.to(this.brand, 0.4, {delay: 0.8, y:0, ease:Expo.easeOut, onComplete:()=>{
			this.brandMask.css('overflow', 'visible')
		}})

		// Line fade out
		TweenMax.to(this.animeLine, 0.8, {delay: 1, opacity:0, ease:Expo.easeOut})

		// Stagger in rest of content
		TweenMax.set(this.elements, {y:200, opacity:0})
		setTimeout(()=>(TweenMax.staggerTo(this.elements, 0.5, {y:0, opacity:1, ease:Expo.easeOut}, 0.1)), 1000)
	}

	buyClick(e) {
		e.preventDefault()
		const self = this
		let selectedSize

		if (this.props.currentProduct.sizes.length > 1) {
			let btns = document.getElementsByName('radio-glasses-size')
			for (var i=0; i<btns.length; i++) {
				if (btns[i].checked) {
					selectedSize = btns[i].value
					break
				}
			}
		} else {
			selectedSize = this.props.currentProduct.sizes[0]
		}

		if (selectedSize) {

			const postObj = {}
			postObj["purchase-sku-id"] = this.props.currentProduct["sku-id"]
			postObj["purchase-price"] = parseFloat(this.props.currentProduct["price"]) * 100
			postObj["purchase-sku-size"] = selectedSize
			postObj["purchase-datatime"] = new Date().toISOString()	

			let buyPostReq = $.post("/buy/", postObj)
			buyPostReq.done(function(data){
				let response = JSON.parse(data);
				if (response.postSuccess) {
					self.confirmBuySuccess()
				} else {
					self.confirmBuyFailure()
				}
			})
			buyPostReq.fail(function(data){
				if (window.location.hostname.indexOf("localhost") > -1 || window.location.hostname.indexOf("local") > -1) {
					console.log("In this case (localhost), expected behavior is to get a 404.")
					console.log("See live version for typical 200 server response")
					console.log("http://demo2.foxflare.com")
					self.confirmBuySuccess()
				} else {
					//console.log("Failure, status...")
					//console.log(data.status)
					self.confirmBuyFailure()
				}
			})
		} else {
			confirmAlert({
				message: 'Please select your glasses size.',
				buttons: [
					{
						label: 'Close',
					}
				]
			})
		}
	}

	// react-confirm-alert  documentation here
	// https://github.com/GA-MO/react-confirm-alert/blob/master/Document-v1.md

	confirmBuySuccess() {
		confirmAlert({
			message: 'Thank you for your purchase.',
			buttons: [
				{
					label: 'Close',
				}
			]
		})
	}

	confirmBuyFailure() {
		confirmAlert({
			message: 'There was a problem. Please try again later.',
			buttons: [
				{
					label: 'Close',
				}
			]
		})
	}

	render() {

		// For animation
		this.previoiusHasProdInfo = this.hasProductInfo
		this.hasProductInfo = !isEmpty(this.props.currentProduct)

		// No current product in state, break out, render nothing
		if (!this.hasProductInfo) {
			return null
		}

		const { images, name, brand, price, description, sizes } = this.props.currentProduct

		return (
			<div className="product-details">
				<div className="container glasses">
					<div className="row">
						<div className="col">
							<img className="glasses-large" src={images['frontal']} alt={name+"-frontview"} />
							<img className="glasses-large" src={images['side']} alt={name+"-sideview"} />
						</div>
					</div>
				</div>
				<div className="brand-name-holder">
					<div className="brand-name">
						<div className="brand-mask">
							<h1 className="brand">{brand}</h1>
						</div>
						<div className="anime-line-brand" />
					</div>
				</div>
				<div className="name">{name}</div>
				<div className="price">${price}</div>
				<div className="container">
					<div className="row">
						<div className="col-sm">
							 <p className="description" dangerouslySetInnerHTML={{ __html: description }} />
						</div>
						<div className="col-sm form-holder">
							<form>
								{ sizes.length > 1 ? (
									<Fragment>
										<div className="glasses-size">Select Size:</div>
										{ sizes.map((size, index) => (
											<label className="radio-btn" key={index}>
												{size}
												<input type="radio" name="radio-glasses-size" value={size}/>
												<span className="checkmark"></span>
											</label>
										))}
									</Fragment>
								) : (
									<Fragment>
										<div className="glasses-size">One Size Available:</div>
										{sizes[0]}
									</Fragment>
								)}
								<button className="buy-btn" type="submit" onClick={this.buyClick}>BUY NOW</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentProduct: state.currentProduct,
		tabFocusObj: state.tabFocusObj
	}
}

export default connect(mapStateToProps)(ProductDetails)

