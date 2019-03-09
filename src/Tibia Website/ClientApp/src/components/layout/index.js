import React, { Component } from 'react';
import "./style.css";
import { Navigation } from '../navigation';
import { Content } from '../content';
import { Social } from '../social';
import { Footer } from '../footer';

export class Layout extends Component {
  render () {
    return (
      <div className="layout-base col-12">
        <div className="row content-holder">
          <Navigation></Navigation>
          <Content>
            {this.props.children}
          </Content>
          <Social></Social>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
