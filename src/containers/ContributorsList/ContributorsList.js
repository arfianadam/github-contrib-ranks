import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { push } from 'react-router-redux';

import { setPage } from 'redux/modules/globalvar';
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
  page: state.globalvar.page
}))
export default class ContributorsList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    contributors: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPageChange = pageIndex => {
    const { dispatch } = this.props;
    dispatch(setPage(pageIndex));
  }

  handleRow = (state, rowInfo) => {
    const { dispatch } = this.props;
    if (rowInfo) {
      return {
        onClick: () => dispatch(push(`/users/${rowInfo.row.login}`))
      };
    }
    return {};
  }

  render() {
    const { contributors, isLoading, page } = this.props;
    return (
      <div className={styles.ContributorsList}>
        <ReactTable
          page={page}
          loading={isLoading}
          data={contributors}
          columns={columns}
          defaultSorted={defaultSorted}
          getTdProps={this.handleRow}
          onPageChange={this.onPageChange}
          filterable />
      </div>
    );
  }
}
