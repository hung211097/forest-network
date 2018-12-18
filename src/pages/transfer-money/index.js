import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup, InputGroupAddon, Input, FormGroup, FormFeedback } from 'reactstrap';
import transaction from '../../lib/transaction';
import { connect } from 'react-redux'
import ApiService from '../../services/api.service'
import { Keypair } from 'stellar-base';
import SweetAlert from 'react-bootstrap-sweetalert';
import { calcBandwithConsume } from '../../services/utils.service';
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

class TransferMoney extends Component {
  static propTypes = {
    profile: PropTypes.object
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      memo: '',
      my_private_key: '',
      your_public_key: '',
      amount: 0,
      isSubmit: false,
      error: '',
      isShowError: false,
      isShow: false
    }
  }

  handleChangeAmount(e){
    this.setState({
      amount: +e.target.value
    })
  }

  handleChangeMyPrivateKey(e){
    this.setState({
      my_private_key: e.target.value
    })
  }

  handleChangeYourPublicKey(e){
    this.setState({
      your_public_key: e.target.value
    })
  }

  handleChangeMemo(e){
    this.setState({
      memo: e.target.value
    })
  }

  validate(){
    if(this.state.my_private_key === ''){
      return false
    }
    if(this.state.amount <= 0){
      return false
    }
    if(this.state.your_public_key === ''){
      return false
    }
    return true
  }

  handleSubmit(){
    this.setState({
      isSubmit: true
    })

    if(!this.validate()){
      return
    }

    const {profile} = this.props
    const tx = {
      version: 1,
      sequence: profile.sequence + 1,
      memo: this.state.memo ? Buffer.from(this.state.memo) : Buffer.alloc(0),
      account: profile.public_key,
      operation: "payment",
      params: {
        address: this.state.your_public_key,
        amount: this.state.amount
      },
      signature: new Buffer(64)
    }
    let key = null
    try{
      key = Keypair.fromSecret(this.state.my_private_key)
    }
    catch(exception){
      this.setState({
        error: 'Invalid private key!',
        isShowError: true
      })
      return
    }

    try{
      transaction.encode(tx).toString('base64')
    }
    catch(e){
      this.setState({
        error: 'Invalid public key!',
        isShowError: true
      })
      return
    }

    if(key.publicKey() !== profile.public_key){
      this.setState({
        error: 'Private key does not match with public key!',
        isShowError: true
      })
      return
    }
    if(this.state.your_public_key === profile.public_key){
      this.setState({
        error: 'Public key must belong to another!',
        isShowError: true
      })
      return
    }

    let consume = calcBandwithConsume(this.props.profile, transaction.encode(tx).toString('base64'), new Date())
    if(consume > this.props.profile.bandwithMax){
      this.setState({
        error: "You don't have enough OXY to conduct transaction!",
        isShowError: true
      })
      return
    }

    transaction.sign(tx, this.state.my_private_key);
    let TxEncode = '0x' + transaction.encode(tx).toString('hex');
    this.apiService.conductTransaction(TxEncode).then((status) => {
      if(status === 'success'){
        this.setState({
          memo: '',
          my_private_key: '',
          your_public_key: '',
          amount: 0,
          isSubmit: false,
          isShow: true
        })
      }
      else{
        this.setState({
          memo: '',
          my_private_key: '',
          your_public_key: '',
          amount: 0,
          isSubmit: false,
          isShowError: true,
          error: 'Fail to conduct transaction!'
        })
      }
    })
  }

  hideAlert(){
    this.setState({
      isShow: false
    })
  }

  hideAlertError(){
    this.setState({
      isShowError: false
    })
  }

  render() {
    return (
      <Layout>
        <div className={styles.transferMoney}>
          <h2 className="text-center page-title">Transfer Money</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="col-12 col-sm-4 my-account">
                <div className="info">
                  <h2 className="title">My Account</h2>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Private key</InputGroupAddon>
                      <Input value={this.state.my_private_key} name="private-key"
                        onChange={this.handleChangeMyPrivateKey.bind(this)}
                        invalid={!this.state.my_private_key && this.state.isSubmit ? true : false}/>
                    </InputGroup>
                    <FormFeedback invalid="true" className={!this.state.my_private_key && this.state.isSubmit ? "d-block" : ''}>
                      Private key is empty!
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Amount (CEL)</InputGroupAddon>
                      <Input value={this.state.amount} name="amount"
                        onChange={this.handleChangeAmount.bind(this)}
                        type="number"
                        invalid={this.state.amount <= 0 && this.state.isSubmit ? true : false}/>
                    </InputGroup>
                    <FormFeedback invalid="true" className={this.state.amount <= 0 && this.state.isSubmit ? "d-block" : ''}>
                      Amount is required to be more than zero!
                    </FormFeedback>
                  </FormGroup>
                  <textarea className="form-control" name="note" placeholder="Note" onChange={this.handleChangeMemo.bind(this)}
                    value={this.state.memo}>
                  </textarea>
                </div>
              </div>
              <div className="col-12 col-sm-1 arrow">
                <i className="d-sm-block d-none"><FontAwesomeIcon icon="arrow-right"/></i>
                <i className="d-sm-none d-block"><FontAwesomeIcon icon="arrow-down"/></i>
              </div>
              <div className="col-12 col-sm-4 your-account">
                <div className="info">
                  <h2 className="title">Received Account</h2>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">Public key</InputGroupAddon>
                      <Input value={this.state.your_public_key} name="public-key"
                        onChange={this.handleChangeYourPublicKey.bind(this)}
                        placeholder="Public key"
                        invalid={!this.state.your_public_key && this.state.isSubmit ? true : false}/>
                    </InputGroup>
                    <FormFeedback invalid="true" className={!this.state.your_public_key && this.state.isSubmit ? "d-block" : ''}>
                      Public key is empty!
                    </FormFeedback>
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="confirm-area">
              <button type="button" className="btn btn-azure btn-register" onClick={this.handleSubmit.bind(this)}>Send</button>
            </div>
          </form>
          <SweetAlert
          	success
          	confirmBtnText="OK"
          	confirmBtnBsStyle="success"
          	title="Transaction is conducted successfully!"
            show={this.state.isShow}
            onConfirm={this.hideAlert.bind(this)}
            onCancel={this.hideAlert.bind(this)}>
          </SweetAlert>
          <SweetAlert
          	error
          	confirmBtnText="OK"
          	confirmBtnBsStyle="danger"
          	title={this.state.error}
            show={this.state.isShowError}
            onConfirm={this.hideAlertError.bind(this)}
            onCancel={this.hideAlertError.bind(this)}>
          </SweetAlert>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(TransferMoney);
