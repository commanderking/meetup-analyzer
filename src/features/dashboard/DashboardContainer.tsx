import React, { useEffect } from "react";
import LoginContainer from "../login/LoginContainer";
import { getEvents } from "../../requests/eventRequest";
import { getAttendanceForEvents } from "../../requests/attendanceRequest";
import { useAttendanceAndEvents } from "./DashboardRequests";

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
    // console.log("auth", auth);
    // console.log("auth", auth.getAccessToken());
    // console.log("auth", auth.getIdToken());
    // console.log("auth", auth.isAuthenticated());
    if (auth && auth.getAccessToken()) {
      login(auth.getIdToken());
    }
  }, []);

  const { isLoading, hasError, events, attendance } = useAttendanceAndEvents();
  console.log("attendance", attendance);
  console.log("events", events);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <LoginContainer auth={auth} />
      <div>Dashboard</div>
    </div>
  );
};

export default DashboardContainer;
