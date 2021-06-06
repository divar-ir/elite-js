import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { getDisplayName } from 'src/utils/hoc';
import { getEnv } from 'src/utils/env';

import { getContext } from './index';

function withSSRData(WrappedComponent) {
  class WithSSRDataComponent extends Component {
    componentWillUnmount() {
      const {
        match: { path },
      } = this.props;
      this.resetData(path);
    }

    render() {
      const {
        match: { path },
      } = this.props;
      const { Consumer } = getContext();

      return (
        <Consumer>
          {({ data: { [path]: initialSSRData = {} }, clearDataByKey }) => {
            this.resetData = clearDataByKey;

            return (
              <WrappedComponent
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...this.props}
                initialSSRData={initialSSRData}
              />
            );
          }}
        </Consumer>
      );
    }
  }

  WithSSRDataComponent[getEnv('HAS_PRELOADED_DATA_KEY')] = true;
  WithSSRDataComponent.WrappedComponent = WrappedComponent;
  WithSSRDataComponent.displayName = getDisplayName({
    component: WrappedComponent,
    hocName: 'WithSSRData',
  });
  WithSSRDataComponent.propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string,
    }).isRequired,
  };

  return withRouter(WithSSRDataComponent);
}

export default withSSRData;
