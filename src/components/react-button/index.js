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
    objIcon: PropTypes.object,
    profile: PropTypes.object,
    react: PropTypes.bool,
    onChangeReact: PropTypes.func
  }

  static defaultProps = {
    react: false
  }

  componentDidMount(){

  }

  handleReact(){
    this.props.onChangeReact && this.props.onChangeReact(this.props.objIcon.type)
  }

  render() {
    return (
      <div className={styles.react}>
        {this.props.objIcon &&
          <button type="button"
            className={this.props.react ?
            "btn btn-default btn-xs btn-icon hvr-bounce-in active-icon " + this.props.objIcon.icon :
            "btn btn-default btn-xs btn-icon hvr-bounce-in " + this.props.objIcon.icon}
            onClick={this.handleReact.bind(this)}
            data-tip={this.props.objIcon.text}>
            <i><FontAwesomeIcon icon={this.props.objIcon.icon}/></i>
          </button>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactButton);
