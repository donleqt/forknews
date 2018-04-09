import {createAppStore} from '../../helpers/redux/store-creator';
import articleReducer from '../reducers/article';
import {articleActions} from '../actions/article';

const rootReducer = {
  article: articleReducer
};

const actionList = {
  article: articleActions
};

export const store = createAppStore(rootReducer, actionList);

