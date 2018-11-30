import React, { Component } from 'react';
import styles from'./index.scss';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
 } from 'reactstrap';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className={styles.header}>
        <Navbar color="light" light expand="md">
          <div className="container">
            <NavbarBrand>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle.bind(this)} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Home</NavLink>
                </NavItem>
                <div className="d-sm-none d-block">
                  <NavItem>
                    <NavLink>Update profile</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>Followers</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>Following</NavLink>
                  </NavItem>
                </div>
                <UncontrolledDropdown nav inNavbar className="d-sm-block d-none">
                  <DropdownToggle nav caret>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Update profile
                    </DropdownItem>
                    <DropdownItem>
                      Followers
                    </DropdownItem>
                    <DropdownItem>
                      Following
                    </DropdownItem>
                    <DropdownItem divider />
                    <Link to="/login" className="dropdown-item">
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
