import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRepos, clearRepos } from 'redux/modules/repos';
import { clearRequests } from 'redux/modules/requests';
import { clearContributors } from 'redux/modules/contributors';
import { setOrgName } from 'redux/modules/globalvar';
import styles from './SearchBox.scss';

@connect(state => ({
  orgName: state.globalvar.orgName,
  requests: state.requests
}))
export default class SearchBox extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    requests: PropTypes.array.isRequired,
    orgName: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      longRequest: false
    };
  }

  handleChange = e => {
    const { dispatch } = this.props;
    dispatch(setOrgName(e.target.value));
  }

  submit = e => {
    e.preventDefault();
    const { dispatch, orgName } = this.props;
    dispatch(clearRequests());
    dispatch(clearRepos());
    dispatch(clearContributors());
    dispatch(getRepos(orgName));
    setTimeout(() => {
      this.setState({
        longRequest: true
      });
    }, 3000);
  }

  render() {
    const { isLoading, orgName, requests } = this.props;
    const { longRequest } = this.state;
    return (
      <div className={styles.SearchBox}>
        <div className={`${styles.container} form-group`}>
          <form onSubmit={this.submit}>
            <input
              type="text"
              className="form-control"
              placeholder="Insert organization slug.."
              value={orgName}
              disabled={isLoading}
              onChange={this.handleChange} />
            <button
              className="btn btn-primary"
              disabled={isLoading}
              type="submit">Go!</button>
          </form>
        </div>
        {isLoading &&
          <span><i className="fa fa-spinner fa-pulse" aria-hidden="true" />&nbsp;This might take a while.. ({`${requests.length}`}) requests</span> // eslint-disable-line
        }
        {isLoading && longRequest &&
          <p>You are requesting many nested data. Please wait..</p> // eslint-disable-line
        }
      </div>
    );
  }
}
