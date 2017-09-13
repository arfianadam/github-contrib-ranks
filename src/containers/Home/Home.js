import React, { Component } from 'react';
import Helmet from 'react-helmet';
import SearchBox from 'containers/SearchBox';
import ContributorsList from 'containers/ContributorsList';

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
          <SearchBox />
          <ContributorsList />
        </div>
      </div>
    );
  }
}
