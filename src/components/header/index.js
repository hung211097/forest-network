import React, { Component } from 'react';
import styles from'./index.scss';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

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
        {/*<nav className="navbar navbar-white navbar-expand-lg fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <Link to="/" className="navbar-brand">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link to="/" className="navbar-brand">
                Hidden brand
              </Link>
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Link</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Link2</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>*/}
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
                <NavItem>
                  <NavLink>Sign Up</NavLink>
                </NavItem>
                {/*<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>*/}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;
