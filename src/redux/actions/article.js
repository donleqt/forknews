import {ActionTypes} from '../action-types';
import {NetService} from '../../services/net/net';
import {config} from '../../config/config';

// Create net for api call, ge
const {net} = new NetService({
  getResponse: resp => resp && resp.response,
  query: {
    'api-key': config.apiKey
  }
});

export const articleActions = {
  fetchList: ({q, page}) => async dispatch => {
    dispatch({
      type: ActionTypes.FETCH_ARTICLE_LIST
    });
    const resp = await net.get(config.api.articleSearch, {
      query: {
        page: page - 1,
        q: q
      }
    });
    if (resp) {
      dispatch({
        type: ActionTypes.FETCH_ARTICLE_LIST_SUCCESS,
        data: resp.docs,
        meta: resp.meta
      });
    }
    else {
      dispatch({
        type: ActionTypes.FETCH_ARTICLE_LIST_FAIL
      });
    }
    return resp;
  },
  viewArticle: (article) => {
    return {
      type: ActionTypes.VIEW_ARTICLE,
      data: article
    }
  },
  exitArticle: () => {
    return {
      type: ActionTypes.EXIT_ARTICLE
    }
  }
};