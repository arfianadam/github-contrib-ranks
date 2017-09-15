import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import styles from './RepoDropdown.scss';

@connect(state => ({
  repos: state.repos
}))
export default class RepoDropdown extends Component {
  static propTypes = {
    repos: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = value => {
    const { dispatch } = this.props;
    dispatch(push(`/repos/${value.value}`));
  }

  formatRepos = () => {
    const { repos } = this.props;
    return repos.map(this.mapRepo);
  }

  mapRepo = repo => ({
    value: repo.name,
    label: repo.name
  })

  render() {
    const { isLoading } = this.props;
    return (
      <div className={styles.RepoDropdown}>
        <span>Go to repo:</span>
        <div className={styles.dropdown}>
          <Select
            disabled={isLoading}
            options={this.formatRepos()}
            onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
