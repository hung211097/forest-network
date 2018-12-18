import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components'
import ApiService from '../../services/api.service'
import SweetAlert from 'react-bootstrap-sweetalert';
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';
import { Keypair } from 'stellar-base';
import { Input, FormGroup, FormFeedback } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

class CreateAccount extends Component {
  static propTypes = {
    profile: PropTypes.object
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      isShowError: false,
      isShowSuccess: false,
      private_key: '',
      your_public_key: '',
      isSubmit: false,
      nextStep: false,
      error: '',
      errorPopup: '',
      isShowErrorPopup: false
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

    if(!this.state.private_key){
      this.setState({
        isShowError: true,
        error: "Private key is empty!"
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
        error: "Invalid private key!"
      })
      return
    }

    if(key.publicKey() !== this.props.profile.public_key){
      this.setState({
        isShowError: true,
        error: "Private key does not match your public key!"
      })
      return
    }

    const tx = {
      version: 1,
      sequence: this.props.profile.sequence + 18,
      memo: Buffer.alloc(0),
      account: this.props.profile.public_key,
      operation: "create_account",
      params: {
        address: this.state.your_public_key,
      },
      signature: new Buffer(64)
    }

    let consume = calcBandwithConsume(this.props.profile, transaction.encode(tx).toString('base64'), new Date())
    if(consume > this.props.profile.bandwithMax){
      this.setState({
        errorPopup: "You don't have enough OXY to conduct transaction!",
        isShowErrorPopup: true
      })
      return
    }

    transaction.sign(tx, this.state.private_key);
    let TxEncode = '0x' + transaction.encode(tx).toString('hex');

    this.apiService.createAccount(TxEncode).then((data) => {
      if(data === 'success'){
        this.setState({
          isShowSuccess: true,
          private_key: '',
          your_public_key: '',
          nextStep: false,
          isSubmit: false
        })
      }
      else{
        this.setState({
          isShowErrorPopup: true,
          private_key: '',
          your_public_key: '',
          nextStep: false,
          isSubmit: false,
          errorPopup: 'Fail to create account!'
        })
      }
    })
  }

  hideAlertSuccess(){
    this.setState({
      isShowSuccess: false
    })
  }

  handleNext(){
    this.setState({
      isSubmit: true
    })

    if(!this.state.your_public_key){
      return
    }

    this.setState({
      nextStep: true,
      isSubmit: false
    })
  }

  handleBack(){
    this.setState({
      nextStep: false,
      isSubmit: false
    })
  }

  handleChangePublicKey(e){
    this.setState({
      your_public_key: e.target.value
    })
  }

  handleChangePrivateKey(e){
    this.setState({
      isShowError: false,
      private_key: e.target.value
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
              <div className={this.state.nextStep ? "d-none" : "animated fadeInLeft step"}>
                <h4>New public key</h4>
                <FormGroup>
                  <Input value={this.state.your_public_key} name="public-key"
                    onChange={this.handleChangePublicKey.bind(this)}
                    placeholder="Private key"
                    invalid={!this.state.your_public_key && this.state.isSubmit ? true : false}/>
                  <FormFeedback invalid="true" className={!this.state.your_public_key && this.state.isSubmit ? "d-block" : ''}>
                    Public key is empty!
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className={this.state.nextStep ? "animated fadeInRight step": "d-none"}>
                <h4>Private key</h4>
                <FormGroup>
                  <Input value={this.state.private_key} name="public-key"
                    onChange={this.handleChangePrivateKey.bind(this)}
                    placeholder="Private key"
                    invalid={this.state.isShowError && this.state.isSubmit ? true : false}/>
                  <FormFeedback invalid="true" className={this.state.isShowError && this.state.isSubmit ? "d-block" : ''}>
                    {this.state.error}
                  </FormFeedback>
                </FormGroup>
              </div>
              <div className="control-area">
                <span className={this.state.nextStep ? "btn btn-primary animated fadeInRight" : "d-none"}
                  onClick={this.handleBack.bind(this)}><i><FontAwesomeIcon icon="arrow-left"/></i> Back</span>
                <span className={this.state.nextStep ? "d-none" : "btn btn-primary float-right animated fadeInLeft"}
                  onClick={this.handleNext.bind(this)}>Next <i><FontAwesomeIcon icon="arrow-right"/></i></span>
                <span className={this.state.nextStep ? "btn btn-primary float-right animated fadeInRight" : "d-none"}
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
