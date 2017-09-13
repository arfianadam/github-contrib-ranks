import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './ContributorsList.scss';

@connect(state => ({
  contributors: state.contributors,
  requests: state.requests
}))
export default class ContributorsList extends Component {
  static propTypes = {
    contributors: PropTypes.array.isRequired,
    requests: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { contributors, requests } = this.props;
    const isLoading = requests.filter(req => req.loading).length > 0;
    return (
      <div className={styles.ContributorsList}>
        {!isLoading &&
          <ul>
            {contributors.map(user => <li key={user.id}>{user.login} - {user.name}</li>)}
          </ul>
        }
      </div>
    );
  }
}
