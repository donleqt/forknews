import {connect as defaultConnect} from 'react-redux'
import React from 'react';
import PropTypes from 'prop-types';

export function connect(mapState) {
  return comp => {
    class ConnectWrapper extends React.PureComponent {
      static contextTypes = {
        store: PropTypes.object.isRequired
      };

      render() {
        return React.createElement(comp, {
          actions: this.context.store.actions,
          ...this.props,
          ref: (e) => {
            if (this.props.eRef) {
              this.props.eRef(e);
            }
          }
        });
      }
    }
    return defaultConnect(mapState, null)(ConnectWrapper);
  }

}