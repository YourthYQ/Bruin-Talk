import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

const DomTitle = ({ route }) => {
  document.title = route.meta.title;
  return route.meta.isLogin ? (
    <PrivateRoute element={route.element} userRole={route.meta} />
  ) : (
    route.element
  );
};
function RouterList(props) {
  return (
    <Routes>
      {props.data.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<DomTitle route={route} />}
        />
      ))}
    </Routes>
  );
}

export default RouterList;
