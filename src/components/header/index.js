import React, { Component } from 'react';
import styles from'./index.scss';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiService from '../../services/api.service';
import { keyStorage } from '../../constants/localStorage';
import { removeItem } from '../../services/storage.service';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

class Header extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      isOpen: false
    }
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout(){
    this.apiService.logout().then(() => {})
    removeItem(keyStorage.private_key)
  }

  render() {
    return (
      <div className={styles.header}>
        <Navbar color="light" light expand="md">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="logo" />
            </Link>
            <NavbarToggler onClick={this.toggle.bind(this)} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/profile" className="nav-link">
                    <i><FontAwesomeIcon icon="user" /></i> Profile
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/" className="nav-link">
                    <i><FontAwesomeIcon icon="home" /></i>  Home
                  </Link>
                </NavItem>
                <div className="d-sm-none d-block">
                  <NavItem>
                    <Link to="/edit-profile" className="nav-link">
                      Edit profile
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/create-account" className="nav-link">
                      Create account
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/transfer-money" className="nav-link">
                      Transfer money
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/transaction-history" className="nav-link">
                      Transaction history
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/login" className="nav-link" onClick={this.handleLogout.bind(this)}>
                      <i><FontAwesomeIcon icon="sign-out-alt"/></i> Logout
                    </Link>
                  </NavItem>
                  {/*<NavItem>
                    <NavLink>Followers</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>Following</NavLink>
                  </NavItem>*/}
                </div>
                <UncontrolledDropdown nav inNavbar className="d-sm-block d-none">
                  <DropdownToggle nav caret>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/edit-profile" className="dropdown-item">
                      Edit profile
                    </Link>
                    <Link to="/create-account" className="dropdown-item">
                      Create account
                    </Link>
                    <Link to="/transfer-money" className="dropdown-item">
                      Transfer money
                    </Link>
                    <Link to="/transaction-history" className="dropdown-item">
                      Transaction history
                    </Link>
                    {/*<Link to="/follower" className="dropdown-item">
                      Followers
                    </Link>
                    <Link to="/following" className="dropdown-item">
                      Following
                    </Link>*/}
                    <DropdownItem divider />
                    <Link to="/login" className="dropdown-item" onClick={this.handleLogout.bind(this)}>
                      <i><FontAwesomeIcon icon="sign-out-alt"/></i> Logout
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;
