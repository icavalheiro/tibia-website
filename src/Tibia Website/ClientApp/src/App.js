import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout/';
import { Home } from './components/home/';
import { NotFound } from './components/not_found';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/' component={NotFound} />
      </Layout>
    );
  }
}
