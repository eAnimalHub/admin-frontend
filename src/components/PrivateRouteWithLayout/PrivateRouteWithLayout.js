import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login"> </Navigate>;
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

PrivateRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default PrivateRouteWithLayout;
