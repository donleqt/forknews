import {ActionTypes} from '../action-types';
import {StatusTypes} from '../../constants/app-define';

export const initialState = {
  list: {
    status: null,
    data: null,
    meta: null,
  },
  detail: null
};

// Parse data to standard for UI
export const parseData = data => {
  return {
    id: data._id,
    snippet: data.snippet,
    multimedia: data.multimedia[0] && data.multimedia[0].url,
    pub_date: data.pub_date && new Date(data.pub_date),
    source: data.source,
  };
};

// Calculate standard meta data
export function calculateMeta(meta, pageSize) {
  const totalPage = Math.ceil(meta.hits / pageSize);
  return {
    total: meta.hits,
    totalPage: Math.min(totalPage, 201),
    page: Math.ceil(meta.offset / pageSize) + 1
  }
}

export default function (state = initialState, action) {
  const newState = {...state};
  switch (action.type) {
    case ActionTypes.FETCH_ARTICLE_LIST: {
      newState.list = {
        ...newState.list,
        status: StatusTypes.loading
      };
      break;
    }
    case ActionTypes.FETCH_ARTICLE_LIST_SUCCESS: {
      newState.list = {
        status: StatusTypes.success,
        data: action.data.map(parseData),
        meta: calculateMeta(action.meta, action.data.length)
      };
      break;
    }
    case ActionTypes.FETCH_ARTICLE_LIST_FAIL: {
      newState.list = {
        status: StatusTypes.error,
        data: null,
        meta: action.meta
      };
      break;
    }
    case ActionTypes.VIEW_ARTICLE: {
      newState.detail = action.data;
      break;
    }
    case ActionTypes.EXIT_ARTICLE: {
      newState.detail = null;
      break;
    }
  }
  return newState;
}