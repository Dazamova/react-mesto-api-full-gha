import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const { isLoggedIn, children } = props;
  if (!isLoggedIn) {
    return <Navigate to="sign-in" replace />
  }
  return children ? children : <Outlet />;
}
