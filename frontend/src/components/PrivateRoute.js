import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, userRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthorized(!!(user && userRole?.isLogin));
    setIsDataLoaded(true);
  }, [userRole?.isLogin]);

  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/user/login" replace />;
  }

  return <>{Element}</>;
};

export default PrivateRoute;
