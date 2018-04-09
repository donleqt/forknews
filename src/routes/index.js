import {App} from '../components/App/App';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {config} from '../config/config';
import {HomePage} from '../components/view/HomePage/HomePage';
import {DetailPage} from '../components/view/DetailPage/DetailPage';

const routes = config.routes;
export const AppRoutes = () => {
  return (
      <App>
        <DetailPage/>
        <Switch>
          <Route exact path={routes.home} component={HomePage}/>
        </Switch>
      </App>
  )
};