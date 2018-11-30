import React, { Component } from 'react';
import styles from './index.scss';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div className="container">
          <p className="text-muted"> Copyright © eSocial - All rights reserved </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
