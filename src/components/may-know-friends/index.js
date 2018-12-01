import React, { Component } from 'react';
import styles from'./index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar1 from '../../images/woman-2.jpg';
import avatar2 from '../../images/guy-6.jpg';
import avatar3 from '../../images/guy-5.jpg';
import ReactTooltip from 'react-tooltip';

class MayKnowFriends extends Component {
  render() {
    return (
      <div className={styles.mayKnowFriend}>
        <div className="widget-mayknow">
          <div className="widget-header">
            <h3 className="widget-caption">People You May Know</h3>
          </div>
          <div className="widget-body bordered-top bordered-sky">
            <div className="card-mayknow">
              <div className="content">
                <ul className="list-unstyled team-members">
                  <li>
                    <div className="row">
                      <div className="col-3">
                        <div className="avatar">
                          <img src={avatar1} alt="avatar" className="img-circle img-no-padding img-responsive" />
                        </div>
                      </div>
                      <div className="col-6">
                        Carlos marthur
                      </div>
                      <div className="col-3 text-right">
                        <btn className="btn btn-sm btn-azure btn-icon" data-tip="Follow"><i><FontAwesomeIcon icon="user-plus"/></i></btn>
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
                      <div className="col-6">
                        Maria gustami
                      </div>
                      <div className="col-3 text-right">
                        <btn className="btn btn-sm btn-azure btn-icon" data-tip="Follow"><i><FontAwesomeIcon icon="user-plus"/></i></btn>
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
                      <div className="col-6">
                        Angellina mcblown
                      </div>
                      <div className="col-3 text-right">
                        <btn className="btn btn-sm btn-azure btn-icon" data-tip="Follow"><i><FontAwesomeIcon icon="user-plus"/></i></btn>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ReactTooltip effect="solid"/>
      </div>
    );
  }
}

export default MayKnowFriends;
