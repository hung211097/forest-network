import React, { Component } from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from '../../images/guy-3.jpg';
// import image from '../../images/young-couple-in-love.jpg';
import user1 from '../../images/guy-2.jpg';
// import user2 from '../../images/guy-4.jpg';
// import user3 from '../../images/guy-5.jpg';

class Post extends Component {
  render() {
    return (
      <div className={styles.post}>
        <div className="box box-widget">
          <div className="box-header with-border">
            <div className="user-block">
              <img className="img-circle" src={avatar} alt="avatar" />
              <span className="username"><a href="#">John Breakgrow jr.</a></span>
              <span className="description">Shared publicly - 7:30 PM Today</span>
            </div>
          </div>
          <div className="box-body">
            {/*<img className="img-responsive show-in-modal" src="img/Post/young-couple-in-love.jpg" alt="Photo" />*/}
            <p>I took this photo this morning. What do you guys think?</p>
            <button type="button" className="btn btn-default btn-xs">
              <i><FontAwesomeIcon icon="thumbs-up"/></i> Like
            </button>
            <button type="button" className="btn btn-default btn-xs">
              <i><FontAwesomeIcon icon="share" /></i> Share
            </button>
            <span className="float-right text-muted">127 likes - 3 comments</span>
          </div>
          <div className="box-footer box-comments">
            <div className="box-comment">
              <img className="img-circle img-sm" src={user1} alt="avatar" />
              <div className="comment-text">
                <span className="username">
                  Maria Gonzales
                  <span className="text-muted float-right">8:03 PM Today</span>
                </span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </div>
            </div>
            <div className="box-comment">
              <img className="img-circle img-sm" src={avatar} alt="avatar" />
              <div className="comment-text">
                <span className="username">
                  Luna Stark
                  <span className="text-muted float-right">8:03 PM Today</span>
                </span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </div>
            </div>
          </div>
          <div className="box-footer">
            <form action="#" method="post">
              <img className="img-responsive img-circle img-sm" src={avatar} alt="Alt Text" />
              <div className="img-push">
                <input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
