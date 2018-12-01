import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PostBox, Post, FriendActivity, MayKnowFriends } from '../../components'
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
                <MayKnowFriends />
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
