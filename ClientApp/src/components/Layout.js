import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { LeftSideMenu } from './LeftSideMenu';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
            <NavMenu />
            <div id="main-container">
                <LeftSideMenu />
                <Container className="m-3">
                    {this.props.children}
                </Container>
            </div>
      </div>
    );
  }
}
