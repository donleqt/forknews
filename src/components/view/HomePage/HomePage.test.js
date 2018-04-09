import {HomePage} from './HomePage';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from 'redux/store'
import {mount} from 'enzyme';

describe('Test HomePage', () => {
  it('Should page have "Singapore" title', () => {
    const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage/>
          </BrowserRouter>
        </Provider>);
    expect(component.find('h1').text()).toContain('Singapore');
    component.unmount();
  })
});