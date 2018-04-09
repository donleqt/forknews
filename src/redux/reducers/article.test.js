import reducer from 'redux/reducers/article';
import {parseData, initialState, calculateMeta} from 'redux/reducers/article';
import {ActionTypes} from 'redux/action-types';
import {articles} from 'constants/dummy';
import {StatusTypes} from 'constants/app-define';
import {listMeta} from 'constants/dummy';

describe('Article reducer', () => {

  it('Should have an initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState);
  });

  describe('Test list article', () => {
    it('Should have loading status when call api', () => {
      const action = {
        type: ActionTypes.FETCH_ARTICLE_LIST
      };
      const expectedValue = StatusTypes.loading;
      expect(
          reducer(undefined, action).list.status
      ).toBe(expectedValue);
    });

    it('Should save data and have status success', () => {
      const action = {
        type: ActionTypes.FETCH_ARTICLE_LIST_SUCCESS,
        data: articles,
        meta: listMeta,
      };
      const expectedState = {
        status: StatusTypes.success,
        data: articles.map(parseData),
        meta: calculateMeta(listMeta, articles.length)
      };
      expect(
          reducer(undefined, action)
              .list
      ).toEqual(expectedState);
    });
  });

  describe('Test detail article', () => {
    it('Should set article detail', () => {
      const article0 = parseData(articles[0]);
      const action = {
        type: ActionTypes.VIEW_ARTICLE,
        data: article0
      };
      expect(
          reducer(undefined, action).detail
      ).toBe(article0);
    });

    it('Should remove article detail', () => {
      const action = {
        type: ActionTypes.EXIT_ARTICLE,
      };
      expect(
          reducer(undefined, action).detail
      ).toBe(null);
    });
  });
});
