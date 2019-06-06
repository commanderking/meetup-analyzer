import React, { useState, useContext } from "react";

const EventsContext = React.createContext<{
  events: Array<any>;
  currentEvent: string;
  setEvents: any;
  setCurrentEvent: any;
} | null>(null);

const EventsProvider = (props: {}) => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState("");

  const value = React.useMemo(() => {
    return {
      events,
      setEvents,
      currentEvent,
      setCurrentEvent
    };
  }, [events]);

  return <EventsContext.Provider value={value} {...props} />;
};

const useEventsState = () => {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error(
      "useReactionState must be used within a ReactionContext Provider"
    );
  }

  return context;
};

export { EventsProvider, useEventsState };
