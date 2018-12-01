import React, { Component } from 'react';
import styles from'./index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class PostBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: ''
    }
  }
  render() {
    return (
      <div className={styles.postBox}>
        <div className="box profile-info n-border-top">
          <form>
            <textarea className="form-control input-lg p-text-area" rows={2} placeholder="Whats in your mind today?" defaultValue={this.state.content} />
          </form>
          <div className="box-footer box-form">
            <button type="button" className="btn btn-azure float-right">Post</button>
            <ul className="nav nav-pills">
              <li><a href="null"><i><FontAwesomeIcon icon="image"/></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PostBox;
