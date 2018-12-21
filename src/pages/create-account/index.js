import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components'
import ApiService from '../../services/api.service'
import SweetAlert from 'react-bootstrap-sweetalert';
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';
import { Input, FormGroup, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { SecretKey } from '../../constants/crypto';
import CryptoJS from 'crypto-js';

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

class CreateAccount extends Component {
  static propTypes = {
    profile: PropTypes.object,
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      isShowError: false,
      isShowSuccess: false,
      your_public_key: '',
      isSubmit: false,
      error: '',
      errorPopup: '',
      isShowErrorPopup: false,
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

  componentDidMount(){
    this.toggleAbsoluteFooter(true)
  }

  handleSubmit(){
    this.setState({
      isSubmit: true
    })

    if(!this.state.your_public_key){
      this.setState({
        isShowError: true,
        error: 'Public key is empty!'
      })
      return
    }

    this.apiService.getCurrentProfile().then((data) => {
      const profile = data
      const tx = {
        version: 1,
        sequence: profile.sequence + 1,
        memo: Buffer.alloc(0),
        account: profile.public_key,
        operation: "create_account",
        params: {
          address: this.state.your_public_key,
        },
        signature: new Buffer(64)
      }

      if(this.state.your_public_key === profile.public_key){
        this.setState({
          error: 'Public key must belong to another!',
          isShowError: true
        })
        return
      }

      try{
        transaction.encode(tx).toString('base64')
      }
      catch(e){
        this.setState({
          error: "Invalid public key!!",
          isShowError: true
        })
        return
      }

      let consume = calcBandwithConsume(profile, transaction.encode(tx).toString('base64'), new Date())
      if(consume > this.props.profile.bandwithMax){
        this.setState({
          errorPopup: "You don't have enough OXY to conduct transaction!",
          isShowErrorPopup: true
        })
        return
      }

      let temp = loadItem(keyStorage.private_key)
      let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)

      transaction.sign(tx, my_private_key);
      let TxEncode = '0x' + transaction.encode(tx).toString('hex');

      this.apiService.createAccount(TxEncode).then((data) => {
        if(data === 'success'){
          this.setState({
            isShowSuccess: true,
            your_public_key: '',
            nextStep: false,
            isSubmit: false,
          })
        }
        else{
          this.setState({
            isShowErrorPopup: true,
            your_public_key: '',
            nextStep: false,
            isSubmit: false,
            errorPopup: 'Fail to create account!'
          })
        }
      })
    })
  }

  hideAlertSuccess(){
    this.setState({
      isShowSuccess: false
    })
  }

  handleChangePublicKey(e){
    this.setState({
      your_public_key: e.target.value
    })
  }

  hideAlertError(){
    this.setState({
      isShowErrorPopup: false
    })
  }

  render() {
    return (
      <Layout>
        <div className={styles.createAccount}>
          <div className="row create-account">
            <h2>Create Account</h2>
            <div className="col-12 col-sm-5">
              <div className="animated fadeIn step">
                <h4>New public key</h4>
                <FormGroup>
                  <Input value={this.state.your_public_key} name="public-key"
                    onChange={this.handleChangePublicKey.bind(this)}
                    placeholder="Public key"
                    invalid={this.state.isShowError && this.state.isSubmit ? true : false}/>
                  <FormFeedback invalid="true" className={this.state.isShowError && this.state.isSubmit ? "d-block" : ''}>
                    {this.state.error}
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="control-area text-center">
                <span className="btn btn-primary animated fadeIn"
                  onClick={this.handleSubmit.bind(this)}>Submit</span>
              </div>
            </div>
          </div>
          <SweetAlert
          	success
          	confirmBtnText="OK"
          	confirmBtnBsStyle="success"
          	title="Create account successfully!"
            show={this.state.isShowSuccess}
            onConfirm={this.hideAlertSuccess.bind(this)}
            onCancel={this.hideAlertSuccess.bind(this)}>
          </SweetAlert>
          <SweetAlert
          	error
          	confirmBtnText="OK"
          	confirmBtnBsStyle="danger"
          	title={this.state.errorPopup}
            show={this.state.isShowErrorPopup}
            onConfirm={this.hideAlertError.bind(this)}
            onCancel={this.hideAlertError.bind(this)}>
          </SweetAlert>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(CreateAccount);
