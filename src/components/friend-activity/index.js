import React, { Component } from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import avatar1 from '../../images/woman-2.jpg';
import avatar2 from '../../images/woman-3.jpg';
import avatar3 from '../../images/woman-4.jpg';

class FriendActivity extends Component {
  render() {
    return (
      <div className={styles.activity}>
        <div className="widget-activity">
          <div className="widget-header">
            <h3 className="widget-caption">Friends activity</h3>
          </div>
          <div className="widget-body bordered-top bordered-sky">
            <div className="card-activity">
              <div className="content">
                <ul className="list-unstyled team-members">
                  <li>
                    <div className="row">
                      <div className="col-3">
                        <div className="avatar">
                          <img src={avatar1} alt="img" className="img-circle img-no-padding img-responsive" />
                        </div>
                      </div>
                      <div className="col-9 fs-13">
                        <b><a href="null">Hillary Markston</a></b> shared a&nbsp;
                        <b><a href="null">publication</a></b>.
                        <span className="timeago">5 min ago</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-3">
                        <div className="avatar">
                          <img src={avatar2} alt="avatar" className="img-circle img-no-padding img-responsive" />
                        </div>
                      </div>
                      <div className="col-9 fs-13">
                        <b><a href="null">Leidy marshel</a></b> shared a&nbsp;
                        <b><a href="null">publication</a></b>.
                        <span className="timeago">5 min ago</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-3">
                        <div className="avatar">
                          <img src={avatar3} alt="avatar" className="img-circle img-no-padding img-responsive" />
                        </div>
                      </div>
                      <div className="col-9 fs-13">
                        <b><a href="null">Presilla bo</a></b> shared a&nbsp;
                        <b><a href="null">publication</a></b>.
                        <span className="timeago">5 min ago</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-3">
                        <div className="avatar">
                          <img src={avatar3} alt="avatar" className="img-circle img-no-padding img-responsive" />
                        </div>
                      </div>
                      <div className="col-9 fs-13">
                        <b><a href="null">Martha markguy</a></b> shared a&nbsp;
                        <b><a href="null">publication</a></b>.
                        <span className="timeago">5 min ago</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendActivity;
