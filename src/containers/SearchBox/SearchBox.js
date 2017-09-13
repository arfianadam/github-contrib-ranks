import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRepos } from 'redux/modules/repos';
import { clearRequests } from 'redux/modules/requests';
import styles from './SearchBox.scss';

@connect(state => ({
  requests: state.requests
}))
export default class SearchBox extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    requests: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      longRequest: false
    };
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  }

  submit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { value } = this.state;
    dispatch(clearRequests());
    dispatch(getRepos(value));
    setTimeout(() => {
      this.setState({
        longRequest: true
      });
    }, 3000);
  }

  render() {
    const { requests } = this.props;
    const { value, longRequest } = this.state;
    const isLoading = requests.filter(req => req.loading).length > 0;
    return (
      <div className={styles.SearchBox}>
        <div className="form-group">
          <form onSubmit={this.submit}>
            <input
              type="text"
              className="form-control"
              placeholder="Insert organization slug.."
              value={value}
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
          <p>This is taking so long. You are requesting many repos and their many contributors and their own profile. Relax.</p> // eslint-disable-line
        }
      </div>
    );
  }
}
