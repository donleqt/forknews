import React from 'react';
import {ArticleItem} from '../../com/ArticleItem/ArticleItem';
import {connect} from '../../../helpers/redux/redux-connector';
import PropTypes from 'prop-types';

@connect(state => ({
  data: state.article.detail
}))
export class DetailPage extends React.PureComponent {

  static propsTypes = {
    data: PropTypes.object
  };

  closeModal = () => {
    this.props.actions.article.exitArticle();
  }

  render() {
    if (!this.props.data) return null;
    return (
        <div className="page-detail">
          <div className="modal-detail">
            <span className="close-btn hand" onClick={this.closeModal}>Close</span>
            <div className="clearfix"/>
            <ArticleItem data={this.props.data}/>
          </div>
        </div>
    );
  }

}