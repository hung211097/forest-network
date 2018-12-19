import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Header, Footer} from './index';

class Layout extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
