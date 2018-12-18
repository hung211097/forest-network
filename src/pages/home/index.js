import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PostBox, Post, FriendActivity, MayKnowFriends, Calendar, ListUser } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ApiService from '../../services/api.service'
import defaultAvatar from '../../images/default-avatar.png'

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
    posts: state.postsReducer.posts
  }
}

class Home extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      sideMenu: [
        {
          title: "News feed",
          isSelect: true,
          icon:"newspaper"
        },
        {
          title: "Calendar",
          isSelect: false,
          icon: "calendar-alt"
        },
        {
          title: "Users",
          isSelect: false,
          icon: "users"
        }
      ]
    }
  }

  static propTypes = {
    profile: PropTypes.object,
    posts: PropTypes.array
  }


  componentDidMount(){
    // this.apiService.getTransactions(1, 10).then((data) => {
    //   console.log(data);
    // })
  }

  handleSelectMenu(index){
    let temp = this.state.sideMenu.concat()
    temp = temp.map((item, key) => {
      item.isSelect = false
      if(key === index){
        item.isSelect = true
      }
      return item
    })
    this.setState({
      sideMenu: temp
    })
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
                        <Link to="/profile" className="border-img">
                          <img src={this.props.profile.avatar ? this.props.profile.avatar : defaultAvatar} alt="avatar" />
                        </Link>
                        <Link to="/profile">
                          <h1>{this.props.profile.username}</h1>
                        </Link>
                        <p>@username</p>
                      </div>
                      <ul className="nav nav-pills nav-stacked">
                        {!!this.state.sideMenu.length && this.state.sideMenu.map((item, key) => {
                            return(
                              <li className={item.isSelect ? "active" : ""} key={key}>
                                <span className="tabMenu" onClick={this.handleSelectMenu.bind(this, key)}>
                                  <i><FontAwesomeIcon icon={item.icon}/></i> {item.title}
                                </span>
                              </li>
                            )
                          })
                        }
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
                        {!!this.state.sideMenu.length && this.state.sideMenu.map((item, key) => {
                            if(item.isSelect){
                              switch(key){
                                case 0:
                                  return(
                                    <div className="animated fadeIn" key={key}>
                                      <PostBox />
                                      {!!this.props.posts.length && this.props.posts.map((item) => {
                                          return(
                                            <Post key={item.id} post={item}/>
                                          )
                                        })
                                      }
                                    </div>
                                  )
                                case 1:
                                  return(
                                    <div className="animated fadeIn" key={key}>
                                      <Calendar />
                                    </div>
                                  )
                                case 2:
                                  return(
                                    <ListUser key={key}/>
                                  )
                                default: return null
                              }
                            }
                            return null
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

export default connect(mapStateToProps)(Home);
