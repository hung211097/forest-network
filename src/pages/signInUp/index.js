import React, { Component } from 'react';
import styles from './index.scss';
import {Footer} from '../../components'
import { Link } from 'react-router-dom'

class SignInUp extends Component {

  handleLogin(){

  }

  handleRegister(){

  }

  render() {
    return (
      <div className={styles.signInUp}>
        <div className="parallax filter-black">
          <div className="parallax-image" />
          <div className="small-info">
            <div className="col-sm-10 col-sm-push-1 col-md-6 col-md-push-3 col-lg-6 col-lg-push-3 mx-auto">
              <div className="card-group animated flipInX">
                <div className="card">
                  <div className="card-block">
                    <div className="center">
                      <h4 className="m-b-0"><span className="icon-text">Login</span></h4>
                      <p className="text-muted">Access your account</p>
                    </div>
                    <form onSubmit={this.handleLogin.bind(this)} method="get">
                      <div className="form-group">
                        <input type="text" className="form-control" name="private-key" placeholder="Private key" />
                      </div>
                      <div className="center">
                        {/*<button type="submit" className="btn btn-azure">Login</button>*/}
                        <Link to="/" className="btn btn-azure btn-register" onClick={this.handleLogin.bind(this)}>Login</Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-block center">
                    <h4 className="m-b-0">
                      <span className="icon-text">Sign Up</span>
                    </h4>
                    <p className="text-muted">Create a new account</p>
                    <form onSubmit={this.handleRegister.bind(this)} method="get">
                      <button type="button" className="btn btn-azure btn-register" onClick={this.handleRegister.bind(this)}>Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SignInUp;
