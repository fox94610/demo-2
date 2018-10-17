import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateCurrentProduct } from '../actions/UpdateCurrentProduct'

class Header extends Component {
  render() {
    return (
      <header onClick={()=>this.props.updateCurrentProduct({})}>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>JIANA</h1>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  updateCurrentProduct: (prod) => dispatch(updateCurrentProduct(prod))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)