import {AppRoutes} from '../routes/index';
import {AppContainer} from 'react-hot-loader';
import {store} from '../redux/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {render} from 'react-dom'
import React from 'react';

function renderApp(Routes) {
  const App = (
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer warnings={false}>
            <Routes/>
          </AppContainer>
        </BrowserRouter>
      </Provider>
  );
  render(
      App,
      document.getElementById('root')
  );
}

renderApp(AppRoutes);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../routes/index', () => {
    require('../routes/index').AppRoutes;
    renderApp(AppRoutes);
  })
}