
import React from "react";
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
  export function withRouter(Component: JSX.IntrinsicAttributes) {
    function ComponentWithRouterProp(props: JSX.IntrinsicAttributes) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <React.Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }