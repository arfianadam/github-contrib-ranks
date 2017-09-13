import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './User.scss';

@connect(state => ({
  contributors: state.contributors
}))
export default class User extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    contributors: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  goHome = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(push('/'));
  }

  goToRepo = path => e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(push(path));
  }

  renderUser = user => (
    <div>
      <article>
        <header>
          <div className={styles.avatar}>
            <img src={user.avatar_url} alt={user.login} />
          </div>
          <div className={styles.info}>
            <h1>{user.name ? user.name : user.login}</h1>
            {user.name &&
              <h3>{user.login}</h3>
            }
            {user.bio &&
              <p>{user.bio}</p>
            }
            <ul>
              {user.blog.length > 0 &&
                <li><i className="fa fa-link" aria-hidden="true"></i> <a href={user.blog}>{user.blog}</a></li>
              }
              {user.company &&
                <li><i className="fa fa-building-o" aria-hidden="true"></i> {user.company}</li>
              }
              {user.location &&
                <li><i className="fa fa-map-marker" aria-hidden="true"></i> {user.location}</li>
              }
            </ul>
            <ul className={styles.stats}>
              <li>
                <div className={styles.label}>followers</div>
                <div className={styles.number}>{user.followers}</div>
              </li>
              <li>
                <div className={styles.label}>following</div>
                <div className={styles.number}>{user.following}</div>
              </li>
              <li>
                <div className={styles.label}>public repos</div>
                <div className={styles.number}>{user.public_repos}</div>
              </li>
              <li>
                <div className={styles.label}>public gists</div>
                <div className={styles.number}>{user.public_gists}</div>
              </li>
            </ul>
          </div>
        </header>
        <hr />
        <main className={styles.main}>
          <h3>Contributions</h3>
          <h4>Total: <strong>{user.total}</strong></h4>
          <ul>
            {user.repo.map(repo => (
              <li key={repo.name}>
                <div>
                  <a
                    href={`/repos/${repo.name}`}
                    onClick={this.goToRepo(`/repos/${repo.name}`)}>
                    {repo.name}
                  </a>
                </div>
                <hr />
                <div className={styles.contributions}>
                  <strong>{repo.contributions}</strong> <span>contributions</span>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </article>
    </div>
  )

  render() {
    const { params, contributors } = this.props;
    const userIndex = contributors.findIndex(contributor => contributor.login === params.username);
    const user = contributors[userIndex];
    const isLoaded = userIndex > -1;
    if (isLoaded) {
      console.log(user);
    }
    return (
      <div className={`${styles.User} container`}>
        <Helmet title={`${params.username}`} />
        {!isLoaded &&
          <h3>User <strong>{params.username}</strong> is not loaded yet. Please load an organization first <a onClick={this.goHome} href="">here</a></h3> // eslint-disable-line
        }
        {isLoaded &&
          this.renderUser(user)
        }
      </div>
    );
  }
}
