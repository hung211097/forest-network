import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputGroup, InputGroupAddon, Input, FormGroup, FormFeedback } from 'reactstrap';

class TransferMoney extends Component {
  constructor(props){
    super(props)
    this.state = {
      memo: '',
      my_public_key: '',
      my_private_key: '',
      your_public_key: '',
      amount: 0,
      isSubmit: false
    }
  }

  handleChangeMyPublicKey(e){
    this.setState({
      my_public_key: e.target.value
    })
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

  validate(){
    if(this.state.my_private_key === ''){
      return false
    }
    if(this.state.my_public_key === ''){
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
                      <InputGroupAddon addonType="prepend">Public key</InputGroupAddon>
                      <Input value={this.state.my_public_key} name="public-key"
                        onChange={this.handleChangeMyPublicKey.bind(this)}
                        invalid={!this.state.my_public_key && this.state.isSubmit ? true : false}/>
                    </InputGroup>
                    <FormFeedback invalid="true" className={!this.state.my_public_key && this.state.isSubmit ? "d-block" : ''}>
                      Public key is empty!
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
                </div>
              </div>
              <div className="col-12 col-sm-1 arrow">
                <i className="d-sm-block d-none"><FontAwesomeIcon icon="arrow-right"/></i>
                <i className="d-sm-none d-block"><FontAwesomeIcon icon="arrow-down"/></i>
              </div>
              <div className="col-12 col-sm-4 your-account">
                <div className="info">
                  <h2 className="title">Your Account</h2>
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
        </div>
      </Layout>
    );
  }
}

export default TransferMoney;
