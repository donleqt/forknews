import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from 'redux/store'
import {mount} from 'enzyme';
import {ArticleList} from './ArticleList';
import {ActionTypes} from '../../../redux/action-types';
import {articles, listMeta} from 'constants/dummy';

describe('Test ArticleList', () => {
  let component = null;

  store.dispatch({
    type: ActionTypes.FETCH_ARTICLE_LIST_SUCCESS,
    data: articles,
    meta: listMeta
  });
  component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ArticleList q="test"/>
        </BrowserRouter>
      </Provider>);

  it('Length of data equal to number of ArticleItem in ArticleList', () => {
    expect(component.find('ArticleItem')).toHaveLength(articles.length);
    component.unmount();
  });
});