export const ActionTypes = {
  FETCH_ARTICLE_LIST: null,
  FETCH_ARTICLE_LIST_SUCCESS: null,
  FETCH_ARTICLE_LIST_FAIL: null,

  VIEW_ARTICLE: null,
  EXIT_ARTICLE: null
};

Object.keys(ActionTypes).map(key => {
  ActionTypes[key] = key;
});