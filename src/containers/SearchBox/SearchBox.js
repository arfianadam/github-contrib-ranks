import React, { Component } from 'react';
import styles from './SearchBox.scss';

export default class SearchBox extends Component {
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

  render() {
    const { value } = this.state;
    return (
      <div className={styles.SearchBox}>
        <input
          type="text"
          value={value}
          onChange={this.handleChange}
          placeholder="Insert organization slug.." />
      </div>
    );
  }
}
