import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import List from './pages/List';
import Details from './pages/Details';
import Edit from './pages/Edit';

function Routes(props) {
  return (
    <Router history={props.history}>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/details/:id" exact component={Details} />
        <Route path="/edit" exact component={Edit} />
      </Switch>
    </Router>
  );
}

export default Routes;