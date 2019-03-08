import React, { Component } from 'react';
import "./style.css";

export class Layout extends Component {
  render () {
    return (
      <div className="layout-base">
        {this.props.children}
      </div>
    );
  }
}
