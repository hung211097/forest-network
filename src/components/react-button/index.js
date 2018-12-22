import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = (dispatch) => {
  return{

  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

class ReactButton extends Component {
  static propTypes = {
    objIcon: PropTypes.object.isRequired,
    profile: PropTypes.object,
  }

  constructor(props){
    super(props)
    this.state = {
      isReact: false
    }
  }

  componentDidMount(){

  }

  handleReact(){

  }

  render() {
    return (
      <div className={styles.react}>
        <button type="button"
          className={this.state.isReact ? "btn btn-default btn-xs btn-icon hvr-bounce-in active " + this.props.objIcon.icon : "btn btn-default btn-xs btn-icon hvr-bounce-in " + this.props.objIcon.icon}
          onClick={this.handleReact.bind(this)}
          data-tip={this.props.objIcon.text}>
          <i><FontAwesomeIcon icon={this.props.objIcon.icon}/></i>
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactButton);
