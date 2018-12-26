import React, { Component } from 'react';
import styles from './index.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closePopup } from '../../actions';
import Popup from 'reactjs-popup';
import ApiService from '../../services/api.service';
import { ReactUsersItem } from '../../components';

const customStyles = {
    width: '90%',
    maxWidth: '600px',
    maxHeight: '500px',
    overflow: 'auto',
    padding: '15px'
}

const customStyleOverlay = {
  zIndex: 9999
}

const mapDispatchToProps = (dispatch) => {
  return{
    closePopup: () => {dispatch(closePopup())}
  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
    popup: state.popupReducer
  }
}

class ReactUsersPopup extends Component {
  static propTypes = {
    profile: PropTypes.object,
    closePopup: PropTypes.func,
    popup: PropTypes.object
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      reactUsers: [],
      page: 1,
      total_page: 0
    }
  }

  componentDidMount(){
    this.loadReactUsers()
  }

  loadReactUsers(){
    this.apiService.getReactUsers(this.props.popup.post_id, this.state.page, 5).then((data) => {
      if(data){
        data.reacts_user.forEach((item) => {
          let temp = this.props.profile.following.find((findItem) => {
            return findItem === item.User.user_id
          })
          if(temp){
            item.isFollow = true
          }
          else{
            item.isFollow = false
          }
        })
        this.setState({
          reactUsers: [...this.state.reactUsers, ...data.reacts_user],
          page: this.state.page + 1,
          total_page: data.total_page
        })
      }
    })
  }

  closeModal(){
    this.props.closePopup && this.props.closePopup()
  }

  render() {
    return (
      <div className={styles.reactUserPopup}>
        <Popup
          open={this.props.popup.isShowPopup}
          closeOnDocumentClick
          modal
          onClose={this.closeModal.bind(this)}
          contentStyle={customStyles}
          overlayStyle={customStyleOverlay}>
         {() => (
           <>
           <span className="close" onClick={this.closeModal.bind(this)}>&times;</span>
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <h3 className="text-center">Reaction Users</h3>
               <div className="modal-congratulations">
                 {!!this.state.reactUsers.length && this.state.reactUsers.map((item, key) => {
                    return(
                      <ReactUsersItem key={key} post={item}/>
                    )
                  })
                 }
               </div>
             </div>
           </div>
           </>
         )}
        </Popup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactUsersPopup);
