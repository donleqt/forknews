import renderer from 'react-test-renderer';
import {articles} from 'constants/dummy';
import {parseData} from 'redux/reducers/article';
import {ArticleItem} from './ArticleItem';
import React from 'react';

describe('Test ArticleItem', () => {
  it('Should render article with right snapshot', () => {
    const article0 = articles[0];
    const component = renderer.create(
        <ArticleItem data={parseData(article0)}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});