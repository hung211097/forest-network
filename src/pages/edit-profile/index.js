import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../../components'
import { InputGroup, InputGroupAddon, Input, FormGroup, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateProfile, updatePost } from '../../actions'
import { validateEmail, validatePhoneNumber, ConvertHTML2TextNewLine, ConvertText2HTMLNewLine } from '../../services/utils.service'
import ReactTooltip from 'react-tooltip';

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
    this.state = {
      tabProfile: true,
      tabSetting: false,
      lockEdit: true,
      isSubmit: false,
      ...this.props.profile
    }
  }

  componentWillUnmount(){
    this.toggleAbsoluteFooter(false)
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

  handleTabProfile(){
    this.setState({
      tabProfile: true,
      tabSetting: false
    })
    this.toggleAbsoluteFooter(false)
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

    this.props.updateProfile && this.props.updateProfile({
      username: this.state.username,
      birthday: this.state.birthday,
      gender: this.state.gender,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      about: ConvertText2HTMLNewLine(this.state.about),
    })
    
    this.props.updatePost && this.props.updatePost({
      id: this.props.profile.userID,
      username: this.state.username
    })

    this.setState({
      lockEdit: true,
      about: ConvertText2HTMLNewLine(this.state.about)
    })
  }

  validate(){
    if(this.state.username === ''){
      return false
    }
    if(this.state.birthday === ''){
      return false
    }
    if(this.state.gender === ''){
      return false
    }
    if(this.state.email === '' || !validateEmail(this.state.email)){
      return false
    }
    if(this.state.phone === '' || !validatePhoneNumber(this.state.phone)){
      return false
    }
    if(this.state.address === ''){
      return false
    }
    if(this.state.about === ''){
      return false
    }
    return true
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
                  <li className={this.state.tabSetting ? "active" : ""}>
                    <span onClick={this.handleTabSetting.bind(this)}><i><FontAwesomeIcon icon="cog"/></i> Settings</span>
                  </li>
                </ul>
                {/* END NAV TABS */}
                <div className="tab-content profile-page">
                  {/* PROFILE TAB CONTENT */}
                  <div className={this.state.tabProfile ? "tab-pane profile active" : "tab-pane profile" } id="profile-tab">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="user-info-left">
                          <img src={profile.avatar} alt="avatar" />
                          <h2>{profile.username}</h2>
                          <div className="contact">
                            <p>
                              <span className="file-input btn btn-azure btn-file">
                                Change Avatar <input type="file" multiple />
                              </span>
                            </p>
                            <p>
                              <span className="file-input btn btn-azure btn-file">
                                Change Cover <input type="file" multiple />
                              </span>
                            </p>
                            {/*<ul className="list-inline social">
                              <li><a href="#" title="Facebook"><i className="fa fa-facebook-square" /></a></li>
                              <li><a href="#" title="Twitter"><i className="fa fa-twitter-square" /></a></li>
                              <li><a href="#" title="Google Plus"><i className="fa fa-google-plus-square" /></a></li>
                            </ul>*/}
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
                              <FormGroup>
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
                              </FormGroup>
                            </div>
                            <div className="contact_info">
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
                          </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END PROFILE TAB CONTENT */}

                  {/* SETTINGS TAB CONTENT */}
                  <div className={this.state.tabSetting ? "tab-pane settings active" : "tab-pane settings"} id="settings-tab">
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
                  </div>
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
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
