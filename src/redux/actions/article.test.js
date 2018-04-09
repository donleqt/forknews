import {articleActions} from 'redux/actions/article';
import {ActionTypes} from 'redux/action-types';
import {articles} from 'constants/dummy';
import {parseData} from 'redux/reducers/article';

describe('actions', () => {
  it('should create an action to view article', () => {
    const article = parseData(articles[0]);
    const expectedAction = {
      type: ActionTypes.VIEW_ARTICLE,
      data: article,
    };
    expect(articleActions.viewArticle(article)).toEqual(expectedAction);
  });

  it('should create an action to exit view article', () => {
    const expectedAction = {
      type: ActionTypes.EXIT_ARTICLE,
    };
    expect(articleActions.exitArticle()).toEqual(expectedAction);
  });
});
