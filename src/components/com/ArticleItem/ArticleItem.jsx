import React from 'react';
import {config} from '../../../config/config';
import {dateTimeToDateRender} from '../../../helpers/utils/time';
import PropsTypes from 'prop-types';

export class ArticleItem extends React.PureComponent {
  static propsTypes = {
    data: PropsTypes.object.isRequired,
    onArticleClick: PropsTypes.func
  };

  onArticleClick = () => {
    if (this.props.onArticleClick) {
      this.props.onArticleClick();
    }
  };

  render() {
    const {snippet, multimedia, pub_date, source} = this.props.data;
    return (
        <div className="article-item" onClick={this.onArticleClick}>
          {!!multimedia && (
              <div className="article-thumbnail">
                <img src={`${config.urlAssets}${multimedia}`} className="article-img"/>
              </div>
          )}
          <div className="article-content">
            <div className="snippet">{snippet}</div>
            {!!source && <div className="source">{source}</div>}
            {!!pub_date && <div className="date">{dateTimeToDateRender(pub_date)}</div>}
          </div>
        </div>
    );
  }
}