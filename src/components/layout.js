import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Header, Footer, ReactUsersPopup} from './index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return{
    popup: state.popupReducer
  }
}

class Layout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    popup: PropTypes.object
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
        {this.props.popup.isShowPopup &&
          <ReactUsersPopup />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Layout);
