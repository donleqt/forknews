import React from 'react';
import PropsType from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter
export class PageControl extends React.PureComponent {
  static propsTypes = {
    onPageChange: PropsType.func.isRequired
  };

  onPageClick = page => {
    if (typeof this.props.onPageChange === 'function') {
      this.props.onPageChange(page);
    }
    this.props.history.push({
      search: `?page=${page}`,
    });
  };

  renderItems = () => {
    const {page} = this.props.params;
    const currentPage = page ? parseInt(page) : 1;
    const listPage = [];
    const firstNo = 1;
    const lastNo = 5;

    listPage.push(
        <li key={0}>
          <button onClick={this.onPageClick.bind(this, currentPage - 1)}>
            &lt;
          </button>
        </li>,
    );

    for (let i = firstNo; i <= lastNo; i++) {
      listPage.push(
          <li key={i}>
            <button
                onClick={this.onPageClick.bind(this, i)}
                className={i === currentPage ? 'active' : ''}>
              {i}
            </button>
          </li>,
      );
    }

    listPage.push(
        <li key={listPage.length + 2}>
          <button onClick={this.onPageClick.bind(this, currentPage + 1)}>
            &gt;
          </button>
        </li>,
    );
    return listPage;
  };

  render() {
    return <ul className="paginator">{this.renderItems()}</ul>;
  }
}