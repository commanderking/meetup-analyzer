import React, { useEffect } from "react";
import LoginContainer from "../login/LoginContainer";
const DashboardContainer = ({ auth }: any) => {
  return (
    <div>
      <LoginContainer auth={auth} />
      <div>Dashboard</div>
    </div>
  );
};

export default DashboardContainer;
