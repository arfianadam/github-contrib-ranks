import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { push } from 'react-router-redux';
import styles from './ContributorsList.scss';

const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    width: 110,
    sortable: false
  },
  {
    Header: 'Username',
    accessor: 'login'
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Contributions',
    accessor: 'total'
  },
  {
    Header: 'Followers',
    accessor: 'followers'
  },
  {
    Header: 'Public Repo',
    accessor: 'public_repos'
  },
  {
    Header: 'Public Gist',
    accessor: 'public_gists'
  },
];
const defaultSorted = [
  {
    id: 'total',
    desc: true
  }
];

@connect(state => ({
  contributors: state.contributors,
  requests: state.requests
}))
export default class ContributorsList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    contributors: PropTypes.array.isRequired,
    requests: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRow = (state, rowInfo) => {
    const { dispatch } = this.props;
    return {
      onClick: () => dispatch(push(`/${rowInfo.row.login}`))
    };
  }

  render() {
    const { contributors, requests } = this.props;
    const isLoading = requests.filter(req => req.loading).length > 0;
    return (
      <div className={styles.ContributorsList}>
        <ReactTable
          loading={isLoading}
          data={contributors}
          columns={columns}
          defaultSorted={defaultSorted}
          getTdProps={this.handleRow}
          filterable />
      </div>
    );
  }
}
