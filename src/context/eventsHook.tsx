import { useEffect, useState } from "react";
import { getEvents } from "../requests/eventRequest";
import { useEventsState } from "../context/eventsContext";

type ApiState = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  events: Array<any>;
};

const loadEvents = async (setApiState: any, setEvents: any) => {
  setApiState((prevState: ApiState) => ({
    ...prevState,
    isLoading: true
  }));

  try {
    const events = await getEvents();
    setEvents(events);
    setApiState((prevState: ApiState) => ({
      ...prevState,
      isLoading: false,
      events
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

export const useEventsCall = () => {
  const [apiState, setApiState] = useState({
    isLoading: true,
    hasError: false,
    errorMessage: "",
    events: []
  });

  const { setEvents } = useEventsState();
  useEffect(() => {
    loadEvents(setApiState, setEvents);
  }, []);

  return { ...apiState };
};
