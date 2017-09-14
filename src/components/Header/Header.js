import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Header.scss';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles.Header} container`}>
        <Link to="/">Go back to main menu</Link>
      </div>
    );
  }
}
