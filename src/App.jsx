import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

// Global components
import Header from './components/Header'

// Interior pages
import GlassesSelector from './interior-pages/GlassesSelector'
// Other interior pages would be placed here

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={GlassesSelector} />
            {/*Other interior pages would be listed here with their respective routes*/}
            
            {/* Non matching URLs end up here, could be a 404 page */}
            <Route component={GlassesSelector} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
}