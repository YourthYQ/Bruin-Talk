import React from "react";
import "./style.css";
import { Outlet } from "react-router-dom";
export default function User() {
  return (
    <div className=" containerLogin">
      <Outlet key="outlet" />
    </div>
  );
}
