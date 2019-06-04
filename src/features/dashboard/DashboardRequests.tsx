import { useEffect, useState } from "react";
import { getEvents } from "../../requests/eventRequest";
import { getAttendanceForEvents } from "../../requests/attendanceRequest";

type ApiState = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  events: Array<any>;
};

const getEventsAndAttendanceForEvents = async (setApiState: any) => {
  setApiState((prevState: ApiState) => ({
    ...prevState,
    isLoading: true
  }));

  try {
    const events = await getEvents();
    // @ts-ignore fix this once event type clear
    const eventIds = events.map(event => event.id);
    // const attendance = await getAttendanceForEvents(eventIds);
    setApiState((prevState: ApiState) => ({
      ...prevState,
      isLoading: false,
      events
      // attendance
    }));
  } catch (err) {
    setApiState((prevState: ApiState) => ({
      ...prevState,
      data: {},
      error: err,
      isLoading: false,
      hasError: true
    }));
  }
};

export const useAttendanceAndEvents = () => {
  const [apiState, setApiState] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: "",
    events: []
  });
  useEffect(() => {
    getEventsAndAttendanceForEvents(setApiState);
  }, []);

  return { ...apiState };
};
