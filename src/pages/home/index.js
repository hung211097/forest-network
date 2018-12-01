import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PostBox, Post, FriendActivity } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => {
  return{

  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
    posts: state.postReducer.posts
  }
}

class Home extends Component {
  static propTypes = {
    profile: PropTypes.object,
    posts: PropTypes.array
  }

  render() {
    return (
      <Layout>
        <div className={styles.home}>
          <div className="container page-content ">
            <div className="row">
              {/* left links */}
              <div className="col-md-3">
                <div className="profile-nav">
                  <div className="widget">
                    <div className="widget-body">
                      <div className="user-heading round">
                        <a href="null">
                          <img src={this.props.profile.avatar} alt="avatar" />
                        </a>
                        <h1>{this.props.profile.fullname}</h1>
                        <p>@username</p>
                      </div>
                      <ul className="nav nav-pills nav-stacked">
                        <li className="active"><a href="null" className="tabMenu"><i><FontAwesomeIcon icon="newspaper"/></i> News feed</a>
                        </li>
                        {/*<li>
                          <a href="#">
                            <i className="fa fa-envelope" /> Messages
                            <span className="label label-info pull-right r-activity">9</span>
                          </a>
                        </li>*/}
                        <li><a href="null" className="tabMenu"> <i><FontAwesomeIcon icon="calendar-alt"/></i> Calendar</a></li>
                        <li><a href="null" className="tabMenu"> <i><FontAwesomeIcon icon="users"/></i> Users</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* end left links */}

              {/* center posts */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <PostBox />
                        {!!this.props.posts.length && this.props.posts.map((item) => {
                            return(
                              <Post key={item.id} post={item}/>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end  center posts */}

              {/* right posts */}
              <div className="col-md-3">
                {/* Friends activity */}
                <FriendActivity />
                {/* End Friends activity */}
                {/* People You May Know */}
                {/*<div className="widget">
                  <div className="widget-header">
                    <h3 className="widget-caption">People You May Know</h3>
                  </div>
                  <div className="widget-body bordered-top bordered-sky">
                    <div className="card">
                      <div className="content">
                        <ul className="list-unstyled team-members">
                          <li>
                            <div className="row">
                              <div className="col-xs-3">
                                <div className="avatar">
                                  <img src="img/Friends/guy-2.jpg" alt="Circle Image" className="img-circle img-no-padding img-responsive" />
                                </div>
                              </div>
                              <div className="col-xs-6">
                                Carlos marthur
                              </div>
                              <div className="col-xs-3 text-right">
                                <btn className="btn btn-sm btn-azure btn-icon"><i className="fa fa-user-plus" /></btn>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              <div className="col-xs-3">
                                <div className="avatar">
                                  <img src="img/Friends/woman-1.jpg" alt="Circle Image" className="img-circle img-no-padding img-responsive" />
                                </div>
                              </div>
                              <div className="col-xs-6">
                                Maria gustami
                              </div>
                              <div className="col-xs-3 text-right">
                                <btn className="btn btn-sm btn-azure btn-icon"><i className="fa fa-user-plus" /></btn>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              <div className="col-xs-3">
                                <div className="avatar">
                                  <img src="img/Friends/woman-2.jpg" alt="Circle Image" className="img-circle img-no-padding img-responsive" />
                                </div>
                              </div>
                              <div className="col-xs-6">
                                Angellina mcblown
                              </div>
                              <div className="col-xs-3 text-right">
                                <btn className="btn btn-sm btn-azure btn-icon"><i className="fa fa-user-plus" /></btn>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>*/}
                {/* End people yout may know */}
              </div>
              {/* end right posts */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
