import React from "react";
import {
  Outlet,
  Navigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem("keepLogin");
  const isSessioned = sessionStorage.getItem("sessionLogin");
  const location = useLocation();
  const context = useOutletContext();
  console.log(context);
  if (!isLoggedIn && !isSessioned) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", from: location.pathname }}
      />
    );
  }
  return <Outlet context={context} />;
}
