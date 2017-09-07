import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import styles from './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.App}>
        <Helmet {...config.app.head} />
        {/* Your code here */}
      </div>
    );
  }
}
