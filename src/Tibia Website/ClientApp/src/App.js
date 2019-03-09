import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/layout/';
import { Home } from './components/home/';
import { NotFound } from './components/not_found';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
