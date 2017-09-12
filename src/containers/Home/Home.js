import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(
  state => ({
    online: state.online
  })
)
export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <Helmet title="Home" />
        <h1>Hello world!</h1>
      </div>
    );
  }
}
