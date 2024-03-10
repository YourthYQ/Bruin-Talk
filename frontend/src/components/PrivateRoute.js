import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, userRole, ...rest }) => {
  const currentUser = localStorage.getItem("user");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    console.log(userRole);
    const checkAuthorization = () => {
      if (currentUser && userRole.isLogin) {
        setIsAuthorized(true);
      }
      setIsDataLoaded(true);
    };
    checkAuthorization();
  }, [userRole, currentUser]);

  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return (
      <>
        <div>{Element}</div>
        <Navigate to="/user/login" />
      </>
    );
  } else {
    return <div>{Element}</div>;
  }
};

export default PrivateRoute;
