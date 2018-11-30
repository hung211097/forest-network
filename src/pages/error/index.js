import React, { Component } from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ErrorPage extends Component {
  render() {
    return (
      <div className={styles.error}>
        <div className="error-header"></div>
        <div className="container ">
          <section className="error-container text-center">
            <h1 className="animated fadeInDown">404</h1>
            <div className="error-divider animated fadeInUp">
              <h2>PAGE NOT FOUND.</h2>
              <p className="description">We Couldn't Find This Page</p>
            </div>
            <Link to="/" className="return-btn">
              <FontAwesomeIcon icon="home" />
              Home
            </Link>
          </section>
        </div>
        <div className="error-background"></div>
      </div>
    );
  }
}

export default ErrorPage;
