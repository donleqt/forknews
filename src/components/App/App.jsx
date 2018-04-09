import React from 'react';
if (process.env.BROWSER) {
  require('../../styles/style.scss');
}
export class App extends React.Component {
  render() {
    return <div className="app-container">
      {this.props.children}
    </div>
  }
}