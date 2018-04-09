import React from 'react';
import {ArticleItem} from '../ArticleItem/ArticleItem';
import {connect} from '../../../helpers/redux/redux-connector';
import {PageControl} from '../PageControl/PageControl';
import {StatusTypes} from '../../../constants/app-define';
import {Loading} from '../Loading/Loading';
import {LocationHelper} from '../../../helpers/utils/location';
import {withRouter} from 'react-router-dom';

@withRouter
@connect(state => ({
  articleList: state.article.list
}))
export class ArticleList extends React.PureComponent {

  componentDidMount() {
    if (!this.props.articleList.data) {
      this.fetchList(parseInt(LocationHelper.getUrlParams(this.props.location.search).page) || 1)
    }
  }

  componentWillReceiveProps(nextProps) {
    const newPage = parseInt(LocationHelper.getUrlParams(nextProps.location.search).page);
    const oldPage = parseInt(LocationHelper.getUrlParams(this.props.location.search).page);

    if (!isNaN(newPage) && newPage !== oldPage) {
      this.fetchList(newPage);
    }
  }

  fetchList(page) {
    this.props.actions.article.fetchList({
      q: this.props.q,
      page
    });
  }

  render() {
    const {data, status, meta} = this.props.articleList;
    if (status === StatusTypes.loading) return <Loading/>;
    if (!data) return null;
    return (
        <div>
          <ul className="article-list">
            {data.map((article, idz) => (
                <li key={idz}>
                  <ArticleItem data={article}
                               onArticleClick={this.props.actions.article.viewArticle.bind(null, article)}/>
                </li>
            ))}
          </ul>
          <PageControl params={meta}/>
        </div>
    );
  }
}