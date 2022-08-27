import { FC, useEffect, Component } from "react";
import { RouterProps } from "react-router-dom";
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

export interface ScrollToTopProps {
  // history?: RouterProps["history"];
  navigator: RouterProps["navigator"]
}

function withRouter(Component: JSX.IntrinsicAttributes | FC<ScrollToTopProps>) {
  function ComponentWithRouterProp(props: JSX.IntrinsicAttributes) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      // <Component
      //   {...props}
      //   router={{ location, navigate, params }}
      // />
      null
    );
  }

  return ComponentWithRouterProp;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({  }) => {
  // useEffect(() => {
  //   const unlisten = history.listen(() => {
  //     window.scrollTo(0, 0);
  //   });
  //   return () => {
  //     unlisten();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return null;
};

export default withRouter(ScrollToTop);
