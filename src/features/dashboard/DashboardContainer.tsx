import React, { useEffect } from "react";
import LoginContainer from "../login/LoginContainer";

const login = async (authenticationToken: string) => {
  await fetch("http://localhost:5000/login", {
    method: "GET",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${authenticationToken}`
    }
  });
};

const DashboardContainer = ({ auth }: any) => {
  useEffect(() => {
    console.log("auth", auth);
    console.log("auth", auth.getAccessToken());
    console.log("auth", auth.getIdToken());
    console.log("auth", auth.isAuthenticated());
    if (auth && auth.getAccessToken()) {
      login(auth.getAccessToken());
    }
  });

  return (
    <div>
      <LoginContainer auth={auth} />
      <div>Dashboard</div>
    </div>
  );
};

export default DashboardContainer;
