import React, { Component } from 'react';
import Helmet from 'react-helmet';

import styles from './styles.scss';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <div className="container">
          <Helmet title="Home" />
          <header>
            <h1>Github Contributors Rank by Organization</h1>
          </header>
        </div>
      </div>
    );
  }
}
