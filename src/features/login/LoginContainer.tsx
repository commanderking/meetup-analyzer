import React, { useEffect } from "react";

const LoginContainer = ({ auth }: any) => {
  const { isAuthenticated, login, logout, renewSession } = auth;

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  });
  return (
    <div>
      <p>Hey</p>
      {!isAuthenticated() && (
        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      )}
      {
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      }
    </div>
  );
};

export default LoginContainer;
