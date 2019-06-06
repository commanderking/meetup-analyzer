import React, { useEffect } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import LoginContainer from "../login/LoginContainer";
import { useAttendanceAndEvents } from "./DashboardRequests";
import EventCard from "./components/EventCard";
import { EventResponse } from "../../requests/eventTypes";
import { useEventsState } from "../../context/eventsContext";
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

  const { isLoading, events } = useAttendanceAndEvents();
  const { setEvents } = useEventsState();
  setEvents(events);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <LoginContainer auth={auth} />
      <div>Dashboard</div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-column-gap: 20px;
          grid-row-gap: 20px;
          grid-auto-rows: 1fr;
          padding: 20px;
        `}
      >
        {events.map((event: EventResponse) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default DashboardContainer;
