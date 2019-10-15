import React, { Component, Fragment } from 'react'
import HeaderTitle from '../components/Header';

export default class PageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <HeaderTitle/>
        <div className="col-10 mx-auto text-center text-title text-uppercase pt-5" >
          <h1 className="display-3">404</h1>
          <h1>error</h1>
          <h2>page not found</h2>
          <h3>the requested URL
          <span className="text-danger"/>
            <span className="text-danger">
              {this.props.location.pathname}
            </span>
            {" "} was not found
          </h3>
        </div>
        </Fragment>
    )
  }
}