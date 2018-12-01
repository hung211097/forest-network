import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../../components'
import avatar from '../../images/guy-3.jpg'
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, FormFeedback } from 'reactstrap';

class EditProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabProfile: true,
      tabSetting: false
    }
  }
  handleTabProfile(){
    this.setState({
      tabProfile: true,
      tabSetting: false
    })
  }

  handleTabSetting(){
    this.setState({
      tabProfile: false,
      tabSetting: true
    })
  }

  render() {
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
                          <img src={avatar} alt="avatar" />
                          <h2>John Breakgrow jr.</h2>
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
                          <div className="basic-info">
                            <h3><i><FontAwesomeIcon icon="square"/></i> Basic Information</h3>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                                <Input placeholder="username" value="John Breakgrow jr." name="username" invalid/>
                              </InputGroup>
                              <FormFeedback invalid className="d-block">Sweet! that name is available</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">Birth Date</InputGroupAddon>
                                <Input placeholder="username" value="Nov 20, 1988" name="birthday" type="date"/>
                              </InputGroup>
                              <FormFeedback invalid>Sweet! that name is available</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">Gender</InputGroupAddon>
                                <Input placeholder="username" value="Male" name="gender"/>
                              </InputGroup>
                              <FormFeedback invalid>Sweet! that name is available</FormFeedback>
                            </FormGroup>
                          </div>
                          <div className="contact_info">
                            <h3><i><FontAwesomeIcon icon="square"/></i> Contact Information</h3>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                <Input placeholder="username" value="me@jonasmith.com" name="email"/>
                              </InputGroup>
                              <FormFeedback invalid>Sweet! that name is available</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">Phone</InputGroupAddon>
                                <Input placeholder="username" value="(1800) 221 - 876543" name="phone"/>
                              </InputGroup>
                              <FormFeedback invalid>Sweet! that name is available</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
                                <Input placeholder="username" value="Riverside City 66, 80123 Denver, Colorado" name="address"/>
                              </InputGroup>
                              <FormFeedback invalid>Sweet! that name is available</FormFeedback>
                            </FormGroup>
                          </div>
                          <div className="about">
                            <h3><i><FontAwesomeIcon icon="square"/></i> About Me</h3>
                            <p>Dramatically facilitate proactive solutions whereas professional intellectual capital. Holisticly utilize competitive e-markets through intermandated meta-services. Objectively.</p>
                            <p>Monotonectally foster future-proof infomediaries before principle-centered interfaces. Assertively recaptiualize cutting-edge web services rather than emerging "outside the box" thinking. Phosfluorescently cultivate resource maximizing technologies and user-centric convergence. Completely underwhelm cross functional innovation vis-a-vis.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END PROFILE TAB CONTENT */}

                  {/* SETTINGS TAB CONTENT */}
                  {/*<div className="tab-pane settings" id="settings-tab">
                    <form className="form-horizontal" role="form">
                      <fieldset>
                        <h3><i><FontAwesomeIcon icon="square"/></i> Change Password</h3>
                        <div className="form-group">
                          <label htmlFor="old-password" className="col-sm-3 control-label">Old Password</label>
                          <div className="col-sm-4">
                            <input type="password" id="old-password" name="old-password" className="form-control" />
                          </div>
                        </div>
                        <hr />
                        <div className="form-group">
                          <label htmlFor="password" className="col-sm-3 control-label">New Password</label>
                          <div className="col-sm-4">
                            <input type="password" id="password" name="password" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="password2" className="col-sm-3 control-label">Repeat Password</label>
                          <div className="col-sm-4">
                            <input type="password" id="password2" name="password2" className="form-control" />
                          </div>
                        </div>
                      </fieldset>
                      <fieldset>
                        <h3><i><FontAwesomeIcon icon="square"/></i> Privacy</h3>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">Show my display name</span>
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">Show my birth date</span>
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">Show my email</span>
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">Show my online status on chat</span>
                          </label>
                        </div>
                      </fieldset>
                      <h3><i className="fa fa-square"> </i>Notifications</h3>
                      <fieldset>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">Receive message from administrator</span>
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">New product has been added</span>
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">Product review has been approved</span>
                          </label>
                        </div>
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" className="colored-blue" defaultChecked="checked" />
                            <span className="text">Others liked your post</span>
                          </label>
                        </div>
                      </fieldset>
                    </form>
                    <p className="text-center"><a href="#" className="btn btn-custom-primary"><i className="fa fa-floppy-o" /> Save Changes</a></p>
                  </div>*/}
                  {/* END SETTINGS TAB CONTENT */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default EditProfile;
