import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Header from 'components/Header';
import styles from './Repo.scss';

@connect(state => ({
  repos: state.repos,
  contributors: state.contributors
}))
export default class Repo extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    contributors: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  filterUserRepo = slug => user => user.repo.filter(this.mapUserRepo(slug)).length > 0;

  mapUserRepo = slug => repo => repo.name === slug;

  goToUser = slug => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(push(`/users/${slug}`));
  }

  goHome = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(push('/'));
  }

  renderRepo = (repo, contributors) => (
    <article>
      <Header />
      <header>
        <div className="container">
          <div className={styles.info}>
            <h1>{repo.name}</h1>
            <h3>{repo.full_name}</h3>
            <p>{repo.description}</p>
          </div>
          <div className={styles.stats}>
            <ul>
              <li>
                <div className={styles.label}>stars</div>
                <div className={styles.number}>{repo.stargazers_count}</div>
              </li>
              <li>
                <div className={styles.label}>forks</div>
                <div className={styles.number}>{repo.forks_count}</div>
              </li>
              <li>
                <div className={styles.label}>watchers</div>
                <div className={styles.number}>{repo.watchers_count}</div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="container">
        <h3>Contributors</h3>
        <div className="contributors">
          <ul>
            {contributors.map(user => {
              const contributions = user.repo[user.repo.findIndex(r => repo.name === r.name)].contributions;
              return (
                <li key={user.id}>
                  <a
                    href={`/users/${user.login}`}
                    onClick={this.goToUser(user.login)}
                  >
                    <div className={styles.avatar}><img src={user.avatar_url} alt={user.login} /></div>
                    <div className={styles.username}>{user.login}</div>
                    <hr />
                    <span>
                      <strong>
                        {contributions}
                      </strong> contribution{contributions > 1 ? 's' : ''}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </article>
  )

  render() {
    const { params, repos, contributors } = this.props;
    const repoIndex = repos.findIndex(repo => repo.name === params.slug);
    const isLoaded = repoIndex > -1;
    const repo = repos[repoIndex];
    const filteredContributors = contributors.filter(this.filterUserRepo(params.slug));
    return (
      <div className={styles.Repo}>
        <Helmet title={`${params.slug}`} />
        {!isLoaded &&
          <div className="container">
            <h3>
              Repo <strong>{params.slug}</strong> is not loaded yet.
              Please load an organization first <a onClick={this.goHome} href="">here</a>
            </h3>
          </div>
        }
        {isLoaded &&
          this.renderRepo(repo, filteredContributors)
        }
      </div>
    );
  }
}
