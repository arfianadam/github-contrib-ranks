import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from 'config';

import styles from './App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.App}>
        <Helmet {...config.app.head} />
        {children}
      </div>
    );
  }
}
