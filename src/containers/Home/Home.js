import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import SearchBox from 'containers/SearchBox';
import RepoDropdown from 'containers/RepoDropdown';
import ContributorsList from 'containers/ContributorsList';

import styles from './styles.scss';

@connect(state => ({
  requests: state.requests
}))
export default class Home extends Component {
  static propTypes = {
    requests: PropTypes.array.isRequired
  }

  filterRequest = req => req.loading;

  render() {
    const { requests } = this.props;
    const isLoading = requests.filter(this.filterRequest).length > 0;
    return (
      <div className={styles.Home}>
        <div className="container">
          <Helmet title="Home" />
          <header>
            <h1>Github Contributors Rank by Organization</h1>
          </header>
          <SearchBox
            isLoading={isLoading} />
          <RepoDropdown
            isLoading={isLoading} />
          <ContributorsList
            isLoading={isLoading} />
        </div>
      </div>
    );
  }
}
