import React from 'react';
import {ArticleList} from '../../com/ArticleList/ArticleList';

export class HomePage extends React.Component {
  render() {
    return (
        <div className="page-home container">
          <div className="home-header">
            <h1 className="title">Times Topics: Singapore</h1>
            <p className="breaf">
              World news about Singapore, including breaking news and archival
              articles published in The New York Times.
            </p>
          </div>
          <ArticleList q="Singapore"/>
        </div>
    )
  }
}