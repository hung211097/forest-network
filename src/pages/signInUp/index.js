import React, { Component } from 'react';
import styles from './index.scss';
import {Footer} from '../../components';
import { Link } from 'react-router-dom';
import ApiService from '../../services/api.service';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Keypair } from 'stellar-base';
import { withRouter } from 'react-router';
import { saveProfileFromApi } from '../../actions';
import { connect } from 'react-redux';
import { Input, FormGroup, FormFeedback } from 'reactstrap';
import crypto from 'crypto';

const mapDispatchToProps = (dispatch) => {
  return{
    saveProfileFromApi: (info) => {dispatch(saveProfileFromApi(info))},
  }
}

class SignInUp extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      isShow: false,
      dataRegister: null,
      private_key: '',
      block: true,
      isSubmit: false,
      errorLogin: '',
      isShowError: false
    }
  }

  componentDidMount(){
    this.apiService.getCurrentProfile().then((data) => {
      if(data){
        this.props.history.push('/')
      }
      else{
        this.setState({
          block: false
        })
      }
    })
  }

  handleLogin(e){
    e.preventDefault();

    this.setState({
      isSubmit: true
    })

    if(!this.state.private_key){
      this.setState({
        isShowError: true,
        errorLogin: 'Private key is empty!'
      })
      return
    }

    let key = null
    try{
      key = Keypair.fromSecret(this.state.private_key)
    }
    catch(e){
      this.setState({
        isShowError: true,
        errorLogin: "Invalid private key!"
      })
      return
    }
    let public_key = key.publicKey()

    this.apiService.login(public_key).then((data) => {
      if(data){
        this.props.saveProfileFromApi && this.props.saveProfileFromApi(data)
        this.props.history.push('/')
      }
      else{
        this.setState({
          isShowError: true,
          errorLogin: "Private key is not registered!"
        })
      }
    })
  }

  handleGenerate(){
    let key = Keypair.random()
    let data = {
      secret_key: key.secret(),
      public_key: key.publicKey(),
      secret_key_base64: key._secretKey.toString('base64'),
      public_key_base64: key._publicKey.toString('base64'),
      tendermint_address: crypto.createHash('sha256').update(key._publicKey).digest().slice(0, 20).toString('hex').toUpperCase()
    }
    this.setState({
      dataRegister: data
    }, () => {
      this.setState({
        isShow: true
      })
    })
  }

  hideAlert(){
    this.setState({
      isShow: false
    })
  }

  handleChangePrivateKey(e){
    this.setState({
      isShowError: false,
      private_key: e.target.value
    })
  }

  render() {
    if(this.state.block){
      return null
    }
    return (
      <div className={styles.signInUp}>
        <div className="parallax filter-black">
          <div className="parallax-image" />
          <div className="small-info">
            <div className="col-sm-10 col-sm-push-1 col-md-6 col-md-push-3 col-lg-6 col-lg-push-3 mx-auto">
              <div className="card-group animated flipInX">
                <div className="card">
                  <div className="card-block">
                    <div className="center">
                      <h4 className="m-b-0"><span className="icon-text">Login</span></h4>
                      <p className="text-muted">Access your account</p>
                    </div>
                    <form onSubmit={this.handleLogin.bind(this)} method="get">
                      <FormGroup>
                        <Input value={this.state.private_key} name="private-key"
                          onChange={this.handleChangePrivateKey.bind(this)}
                          placeholder="Private key"
                          invalid={this.state.isShowError && this.state.isSubmit ? true : false}/>
                        <FormFeedback invalid="true" className={this.state.isShowError && this.state.isSubmit ? "d-block" : ''}>
                          {this.state.errorLogin}
                        </FormFeedback>
                      </FormGroup>
                      {/*<div className="form-group">
                        <input type="text" className="form-control" name="private-key" placeholder="Private key"
                          value={this.state.private_key} onChange={this.handleChangePrivateKey.bind(this)}/>
                      </div>*/}
                      <div className="center">
                        {/*<button type="submit" className="btn btn-azure">Login</button>*/}
                        <Link to="/" className="btn btn-azure btn-register" onClick={this.handleLogin.bind(this)}>Login</Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-block center">
                    <h4 className="m-b-0">
                      <span className="icon-text">Generate Keypair</span>
                    </h4>
                    <p className="text-muted">Help you generate keypair to join</p>
                    <form onSubmit={this.handleGenerate.bind(this)} method="get">
                      <button type="button" className="btn btn-azure btn-register" onClick={this.handleGenerate.bind(this)}>Generate</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <SweetAlert
        	success
        	confirmBtnText="OK"
        	confirmBtnBsStyle="primary"
        	title="Generate Successfully!"
          show={this.state.isShow}
          onConfirm={this.hideAlert.bind(this)}
          onCancel={this.hideAlert.bind(this)}>
          <p className="content-alert">
            <span style={{fontWeight: 'bold'}}>Private Key:</span> {this.state.dataRegister ? this.state.dataRegister.secret_key : ''}
            <br/>
            <span style={{fontWeight: 'bold'}}>Public Key: </span>{this.state.dataRegister ? this.state.dataRegister.public_key : ''}
            <br/>
            <span style={{fontWeight: 'bold'}}>Private Key Base64: </span>{this.state.dataRegister ? this.state.dataRegister.secret_key_base64 : ''}
            <br/>
            <span style={{fontWeight: 'bold'}}>Public Key Base64: </span>{this.state.dataRegister ? this.state.dataRegister.public_key_base64 : ''}
            <br/>
            <span style={{fontWeight: 'bold'}}>Tendermint Address: </span>{this.state.dataRegister ? this.state.dataRegister.tendermint_address : ''}
          </p>
        </SweetAlert>
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignInUp));
