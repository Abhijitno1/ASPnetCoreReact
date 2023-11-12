import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/NavMenu.css';
import { menuShowAction } from '../actions/menuShowAction';
import { connect } from "react-redux";
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
      super(props);
      console.log('props', props);

      this.toggleLeftSideMenu = this.toggleLeftSideMenu.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        //this.state = {
        //  collapsed: true
        //};
  }

  toggleNavbar () {
    //this.setState({
    //  collapsed: !this.state.collapsed
    //});
  }

    toggleLeftSideMenu(event) {
        event.preventDefault();
        console.log('showMenu', this.props.showMenu);
        return this.props.menuShowAction(!this.props.showMenu);
    }

  render() {
    return (
        <header>

        <Navbar id="top-nav-menu" className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">ASPnetCoreReact</NavbarBrand>
                <a href="#" onClick={ this.toggleLeftSideMenu }><i class="fa fa-bars toggle-sidebar-btn" aria-hidden="true"></i></a>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!false} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/world-cities">World Cities</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/redux-demo">Redux Demo</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/jsplayer">JS Player</NavLink>
                </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = state => ({
    ...state.leftMenuReducer
});
const mapDispatchToProps = dispatch => ({
    menuShowAction: (payload) => dispatch(menuShowAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);