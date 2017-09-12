import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRepos } from 'redux/modules/repos';
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
      value: ''
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
    dispatch(getRepos(value));
  }

  render() {
    const { requests } = this.props;
    const { value } = this.state;
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
          <span><i className="fa fa-spinner fa-pulse" aria-hidden="true" />&nbsp;This might take a while..</span>
        }
      </div>
    );
  }
}
