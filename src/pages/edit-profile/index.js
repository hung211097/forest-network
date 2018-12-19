import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout } from '../../components';
import { InputGroup, InputGroupAddon, Input, FormGroup, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile, updatePost } from '../../actions';
// import { validateEmail, validatePhoneNumber, ConvertHTML2TextNewLine, ConvertText2HTMLNewLine } from '../../services/utils.service'
import ReactTooltip from 'react-tooltip';
import SweetAlert from 'react-bootstrap-sweetalert';
import ApiService from '../../services/api.service';
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { SecretKey } from '../../constants/crypto';
import CryptoJS from 'crypto-js';
import defaultAvatar from '../../images/default-avatar.png';

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateProfile: (info) => {dispatch(updateProfile(info))},
    updatePost: (user) => {dispatch(updatePost(user))}
  }
}

class EditProfile extends Component {
  static propTypes = {
      profile: PropTypes.object,
      updateProfile: PropTypes.func,
      updatePost: PropTypes.func
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.limitSize = 4000
    this.state = {
      tabProfile: true,
      tabSetting: false,
      lockEdit: true,
      isSubmit: false,
      username: '',
      file_avatar: null,
      originImageUrl: '',
      imagePreviewUrl: '',
      isShow: false,
      error: '',
      isShowError: false,
      isShowSuccess: false
    }
  }

  componentWillUnmount(){
    this.toggleAbsoluteFooter(false)
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setState({
      username: props.profile.username,
      originImageUrl: props.profile.avatar
    })
  }

  toggleAbsoluteFooter(isAbsolute){
    if(isAbsolute){
      document.getElementsByClassName('footer')[0].style.position = 'absolute'
      document.getElementsByClassName('footer')[0].style.bottom = '0';
    }
    else{
      document.getElementsByClassName('footer')[0].style.position = 'unset'
      document.getElementsByClassName('footer')[0].style.bottom = 'unset';
    }
  }

  componentDidMount(){
    this.toggleAbsoluteFooter(true)
    this.setState({
      username: this.props.profile.username,
      originImageUrl: this.props.profile.avatar
    })
  }

  handleTabProfile(){
    this.setState({
      tabProfile: true,
      tabSetting: false
    })
    this.toggleAbsoluteFooter(true)
  }

  handleTabSetting(){
    this.setState({
      tabProfile: false,
      tabSetting: true
    })
    this.toggleAbsoluteFooter(true)
  }

  handleChangeUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  handleChangeBirthday(e){
    this.setState({
      birthday: e.target.value
    })
  }

  handleChangeGender(e){
    this.setState({
      gender: e.target.value
    })
  }

  handleChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  handleChangePhone(e){
    this.setState({
      phone: e.target.value
    })
  }

  handleChangeAddress(e){
    this.setState({
      address: e.target.value
    })
  }

  handleChangeAbout(e){
    this.setState({
      about: e.target.value
    })
  }

  handleOnSelectFileAvatar(event) {
    if(this.state.lockEdit){
      return
    }
    let file = event.target.files[0]
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file_avatar: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  handleDeleteAvatar(){
    this.setState({
      imagePreviewUrl: '',
      file_avatar: null
    })
  }

  handleUnlockEdit(){
    this.setState({
      lockEdit: false
    })
  }

  handleSaveEdit(){
    if(this.state.lockEdit){
      return
    }
    this.setState({
      isSubmit: true
    })
    if(!this.validate()){
      return
    }

    if(this.state.file_avatar){
      let reader = new FileReader()
      let encodedImage = null
      reader.onload = () => {
        encodedImage = new Buffer(reader.result, 'binary');
        this.handleSubmit(encodedImage)
      }
      reader.readAsBinaryString(this.state.file_avatar)
    }else{
      this.handleSubmit(null)
    }
  }

  handleSubmit(bufferImage) {
    const {profile} = this.props
    const data = {}
    let arrayConsume = []
    let flagSendImage = false
    let changedImage = this.state.imagePreviewUrl

    let temp = loadItem(keyStorage.private_key)
    let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)

    if(bufferImage){
      const tx = {
        version: 1,
        sequence: profile.sequence + 1,
        memo: Buffer.alloc(0),
        account: profile.public_key,
        operation: "update_account",
        params: {
          key: 'picture',
          value: bufferImage
        },
        signature: new Buffer(64)
      }
      flagSendImage = true
      transaction.sign(tx, my_private_key);
      let TxEncode = '0x' + transaction.encode(tx).toString('hex');
      arrayConsume.push(calcBandwithConsume(this.props.profile, transaction.encode(tx).toString('base64'), new Date()))
      data.hexImage = TxEncode
    }

    if(this.state.username !== this.props.profile.username){
      const tx = {
        version: 1,
        sequence: flagSendImage ? profile.sequence + 2 : profile.sequence + 1,
        memo: Buffer.alloc(0),
        account: profile.public_key,
        operation: "update_account",
        params: {
          key: 'name',
          value: new Buffer(this.state.username)
        },
        signature: new Buffer(64)
      }
      transaction.sign(tx, my_private_key);
      let TxEncode = '0x' + transaction.encode(tx).toString('hex');
      arrayConsume.push(calcBandwithConsume(this.props.profile, transaction.encode(tx).toString('base64'), new Date()))
      data.hexUsername = TxEncode
    }

    if(Object.keys(data).length){
      let consume = 0
      arrayConsume.forEach((item) => {
        consume += item
      })

      if(consume > this.props.profile.bandwithMax){
        this.setState({
          error: "You don't have enough OXY to conduct transaction!",
          isShowError: true
        })
        return
      }

      this.apiService.updateProfile(data).then((res) => {
        let isFailedAll = false
        let countFailed = 0
        res.forEach((bool) => {
          if(bool.value === 'failed'){
            countFailed += 1
          }
        })
        if(countFailed === res.length){
          isFailedAll = true
        }

        if(isFailedAll){
          this.setState({
            error: "Fail to update profile!",
            isShowError: true,
            username: this.props.profile.username
          })
          return
        }

        this.setState({
          isShowSuccess: true
        })

        this.props.updateProfile && this.props.updateProfile({
          username: this.state.username,
          avatar: changedImage ? changedImage : this.state.originImageUrl
          // birthday: this.state.birthday,
          // gender: this.state.gender,
          // email: this.state.email,
          // phone: this.state.phone,
          // address: this.state.address,
          // about: ConvertText2HTMLNewLine(this.state.about),
        })

        this.props.updatePost && this.props.updatePost({
          id: this.props.profile.user_id,
          username: this.state.username
        })
      })
    }

    this.setState({
      lockEdit: true,
      // about: ConvertText2HTMLNewLine(this.state.about)
    }, () => {
      this.setState({
        imagePreviewUrl: ''
      })
    })
  }

  validate(){
    if(this.state.username === ''){
      return false
    }
    if(this.state.file_avatar && this.state.file_avatar.size > this.limitSize){
      return false
    }
    // if(this.state.birthday === ''){
    //   return false
    // }
    // if(this.state.gender === ''){
    //   return false
    // }
    // if(this.state.email === '' || !validateEmail(this.state.email)){
    //   return false
    // }
    // if(this.state.phone === '' || !validatePhoneNumber(this.state.phone)){
    //   return false
    // }
    // if(this.state.address === ''){
    //   return false
    // }
    // if(this.state.about === ''){
    //   return false
    // }
    return true
  }

  validateSizeImage(){
    if(this.state.file_avatar.size > this.limitSize){
      return false
    }
    return true
  }

  hideAlertError(){
    this.setState({
      isShowError: false
    })
  }

  hideAlertSuccess(){
    this.setState({
      isShowSuccess: false
    })
  }

  render() {
    let {profile} = this.props
    return (
      <Layout>
        <div className={styles.editProfile}>
          <div className="container page-content edit-profile">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                {/* NAV TABS */}
                <ul className="nav nav-tabs nav-tabs-custom-colored tabs-iconized">
                  <li className={this.state.tabProfile ? "active" : ""}>
                    <span onClick={this.handleTabProfile.bind(this)}><i><FontAwesomeIcon icon="user"/></i> Profile</span>
                  </li>
                  {/*<li className={this.state.tabSetting ? "active" : ""}>
                    <span onClick={this.handleTabSetting.bind(this)}><i><FontAwesomeIcon icon="cog"/></i> Settings</span>
                  </li>*/}
                </ul>
                {/* END NAV TABS */}
                <div className="tab-content profile-page">
                  {/* PROFILE TAB CONTENT */}
                  <div className={this.state.tabProfile ? "tab-pane profile active" : "tab-pane profile" } id="profile-tab">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="user-info-left">
                          <img src={profile.avatar ? profile.avatar : defaultAvatar} className="cur-avatar" alt="avatar" />
                          <h2>{profile.username}</h2>
                          <div className="contact">
                            <p>
                              <span className="file-input btn btn-azure btn-file">
                                Change Avatar <input type="file" accept="image/*" onChange={this.handleOnSelectFileAvatar.bind(this)}/>
                              </span>
                            </p>
                            {/*<p>
                              <span className="file-input btn btn-azure btn-file">
                                Change Cover <input type="file" multiple />
                              </span>
                            </p>*/}
                            {this.state.imagePreviewUrl &&
                              <div className="preview-image">
                                <span onClick={this.handleDeleteAvatar.bind(this)}>X</span>
                                <img src={this.state.imagePreviewUrl} alt="avatar" className="preview-avatar"/>
                              </div>
                            }
                            <FormFeedback invalid="true"
                              className={this.state.file_avatar && !this.validateSizeImage() && this.state.isSubmit ? "d-block" : ''}>
                              Your image is too large!
                            </FormFeedback>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="user-info-right">
                          <form onSubmit={this.handleSaveEdit.bind(this)}>
                            <div className="basic-info">
                              <h3><i><FontAwesomeIcon icon="square"/></i> Basic Information</h3>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                                  <Input value={this.state.username} name="username"
                                    onChange={this.handleChangeUsername.bind(this)} disabled={this.state.lockEdit ? true : false}
                                    invalid={!this.state.username && this.state.isSubmit ? true : false}/>
                                </InputGroup>
                                <FormFeedback invalid="true" className={!this.state.username && this.state.isSubmit ? "d-block" : ''}>
                                  Your username is empty!
                                </FormFeedback>
                              </FormGroup>
                              {/*<FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">Birth Date</InputGroupAddon>
                                  <Input value={this.state.birthday} name="birthday" type="date"
                                    onChange={this.handleChangeBirthday.bind(this)} disabled={this.state.lockEdit ? true : false}
                                    invalid={!this.state.birthday && this.state.isSubmit ? true : false}/>
                                </InputGroup>
                                <FormFeedback invalid="true" className={!this.state.birthday && this.state.isSubmit ? "d-block" : ''}>
                                  Your birthday is empty!
                                </FormFeedback>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">Gender</InputGroupAddon>
                                  <Input value={this.state.gender} name="gender"
                                    onChange={this.handleChangeGender.bind(this)} disabled={this.state.lockEdit ? true : false}
                                    invalid={!this.state.gender && this.state.isSubmit ? true : false}/>
                                </InputGroup>
                                <FormFeedback invalid="true" className={!this.state.gender && this.state.isSubmit ? "d-block" : ''}>
                                  Your gender is empty!
                                </FormFeedback>
                              </FormGroup>*/}
                            </div>
                            {/*<div className="contact_info">
                              <h3><i><FontAwesomeIcon icon="square"/></i> Contact Information</h3>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                  <Input value={this.state.email} name="email"
                                    onChange={this.handleChangeEmail.bind(this)} disabled={this.state.lockEdit ? true : false}
                                    invalid={(!this.state.email || !validateEmail(this.state.email)) && this.state.isSubmit ? true : false}/>
                                </InputGroup>
                                <FormFeedback invalid="true" className={!this.state.email && this.state.isSubmit ? "d-block" : ''}>
                                  Your email is empty!
                                </FormFeedback>
                                <FormFeedback invalid="true" className={this.state.email && !validateEmail(this.state.email) && this.state.isSubmit ? "d-block" : ''}>
                                  Your email is wrong format!
                                </FormFeedback>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">Phone</InputGroupAddon>
                                  <Input value={this.state.phone} name="phone"
                                    onChange={this.handleChangePhone.bind(this)} disabled={this.state.lockEdit ? true : false}
                                    invalid={(!this.state.username || !validatePhoneNumber(this.state.phone)) && this.state.isSubmit ? true : false}/>
                                </InputGroup>
                                <FormFeedback invalid="true" className={!this.state.phone && this.state.isSubmit ? "d-block" : ''}>
                                  Your phone number is empty!
                                </FormFeedback>
                                <FormFeedback invalid="true" className={this.state.phone && !validatePhoneNumber(this.state.phone) && this.state.isSubmit ? "d-block" : ''}>
                                  Your phone number is wrong format!
                                </FormFeedback>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
                                  <Input value={this.state.address} name="address"
                                    onChange={this.handleChangeAddress.bind(this)} disabled={this.state.lockEdit ? true : false}
                                    invalid={!this.state.address && this.state.isSubmit ? true : false}/>
                                </InputGroup>
                                <FormFeedback invalid="true" className={!this.state.address && this.state.isSubmit ? "d-block" : ''}>
                                  Your address is empty!
                                </FormFeedback>
                              </FormGroup>
                            </div>
                            <div className="about">
                              <h3><i><FontAwesomeIcon icon="square"/></i> About Me</h3>
                              <p dangerouslySetInnerHTML={{ __html: this.state.about }} className={!this.state.lockEdit ? "d-none" : ""}></p>
                              <FormGroup>
                                <Input className={this.state.lockEdit ? "d-none" : "form-control input-lg p-text-area"}
                                   type="textarea" name="text" id="exampleText" value={ConvertHTML2TextNewLine(this.state.about)}
                                   rows={5} onChange={this.handleChangeAbout.bind(this)}
                                   invalid={!this.state.about && this.state.isSubmit ? true : false}/>
                                <FormFeedback invalid="true" className={!this.state.about && this.state.isSubmit ? "d-block" : ''}>
                                  Your information is empty!
                                </FormFeedback>
                              </FormGroup>
                            </div>*/}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END PROFILE TAB CONTENT */}

                  {/* SETTINGS TAB CONTENT */}
                  {/*<div className={this.state.tabSetting ? "tab-pane settings active" : "tab-pane settings"} id="settings-tab">
                    <form className="form-horizontal">
                      <fieldset>
                        <h3><i><FontAwesomeIcon icon="square"/></i> Change Password</h3>
                        <div className="form-group row">
                          <label htmlFor="old-password" className="col-sm-3 control-label">Old Password</label>
                          <div className="col-sm-4">
                            <input type="password" id="old-password" name="old-password" className="form-control" />
                          </div>
                        </div>
                        <hr />
                        <div className="form-group row">
                          <label htmlFor="password" className="col-sm-3 control-label">New Password</label>
                          <div className="col-sm-4">
                            <input type="password" id="password" name="password" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="password2" className="col-sm-3 control-label">Repeat Password</label>
                          <div className="col-sm-4">
                            <input type="password" id="password2" name="password2" className="form-control" />
                          </div>
                        </div>
                      </fieldset>
                    </form>
                    <p className="text-center">
                      <span href="null" className="btn btn-custom-primary">
                        <i><FontAwesomeIcon icon="save"/></i> Save Changes
                      </span>
                    </p>
                  </div>*/}
                  {/* END SETTINGS TAB CONTENT */}
                </div>
              </div>
            </div>
          </div>
          <span className="write" data-tip="Edit" onClick={this.handleUnlockEdit.bind(this)}>
            <i><FontAwesomeIcon icon="edit"/></i>
          </span>
          <span className="save" data-tip="Save" onClick={this.handleSaveEdit.bind(this)}>
            <i><FontAwesomeIcon icon="save"/></i>
          </span>
          <ReactTooltip />
          <SweetAlert
          	error
          	confirmBtnText="OK"
          	confirmBtnBsStyle="danger"
          	title={this.state.error}
            show={this.state.isShowError}
            onConfirm={this.hideAlertError.bind(this)}
            onCancel={this.hideAlertError.bind(this)}>
          </SweetAlert>
          <SweetAlert
          	success
          	confirmBtnText="OK"
          	confirmBtnBsStyle="success"
          	title="Update profile successfully!"
            show={this.state.isShowSuccess}
            onConfirm={this.hideAlertSuccess.bind(this)}
            onCancel={this.hideAlertSuccess.bind(this)}>
          </SweetAlert>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
