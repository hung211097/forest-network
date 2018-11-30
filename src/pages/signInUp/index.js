import React, { Component } from 'react';
import styles from './index.scss';

class SignInUp extends Component {
  render() {
    return (
      <div className={styles.signInUp}>
        <div className="parallax filter-black">
          <div className="parallax-image" />
          <div className="small-info">
            <div className="row col-md-22 hidden">
              <form action method="POST" autoComplete="off">
                <input type="text" id="short" name placeholder="Username or email" />
                <input type="password" id="short" name placeholder="Password" />
                {/*<input type="checkbox" name="remember" value="1">*/}
                <a type="submit" href="profile.html" name="login" className="btn btn-danger">Login</a>
                <span className="forgot-password-link">
                  <a href="#">Forgot your password?</a><br />
                </span>
              </form>
            </div>
            <div className="col-sm-10 col-sm-push-1 col-md-6 col-md-push-3 col-lg-6 col-lg-push-3">
              <div className="card-group animated flipInX">
                <div className="card">
                  <div className="card-block">
                    <div className="center">
                      <h4 className="m-b-0"><span className="icon-text">Login</span></h4>
                      <p className="text-muted">Access your account</p>
                    </div>
                    <form action="index.html" method="get">
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                        <a href="#" className="pull-xs-right">
                          <small>Forgot?</small>
                        </a>
                        <div className="clearfix" />
                      </div>
                      <div className="center">
                        <a href="profile.html" className="btn  btn-azure">
                          Login
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card col-md-22 hidden">
                  <div className="card-block">
                    <div className="center">
                      <h4 className="m-b-0"><span className="icon-text">Login</span></h4>
                      <p className="text-muted">Access your account</p>
                    </div>
                    <form action="index.html" method="get">
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                        <a href="#" className="pull-xs-right">
                          <small>Forgot?</small>
                        </a>
                        <div className="clearfix" />
                      </div>
                      <div className="center">
                        <a href="profile.html" className="btn  btn-azure">
                          Login
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="row col-md-22 hidden">
                    <form action method="POST" autoComplete="off">
                      <input type="text" id="short" name placeholder="Username or email" />
                      <input type="password" id="short" name placeholder="Password" />
                      {/*<input type="checkbox" name="remember" value="1">*/}
                      <a type="submit" href="profile.html" name="login" className="btn btn-danger">Login</a>
                      <span className="forgot-password-link">
                        <a href="#">Forgot your password?</a><br />
                      </span>
                    </form>
                  </div>
                  <div className="card-block center">
                    <h4 className="m-b-0">
                      <span className="icon-text">Sign Up</span>
                    </h4>
                    <p className="text-muted">Create a new account</p>
                    <form action="index.html" method="get">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Full Name" />
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirm Password" />
                      </div>
                      <button type="submit" className="btn btn-azure">Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInUp;
