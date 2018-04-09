import {DetailPage} from './DetailPage';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from 'redux/store'
import {mount} from 'enzyme';

describe('Test DetailPage', () => {
  let component = null;

  beforeEach(() => {
    component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <DetailPage/>
          </BrowserRouter>
        </Provider>);
  });

  it('Should not show when have no data', () => {
    expect(component.find('ArticleItem')).toHaveLength(0);
  });
});