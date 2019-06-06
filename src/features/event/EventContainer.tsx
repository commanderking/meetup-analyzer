import React from "react";
import { useEventsState } from "../../context/eventsContext";

type Props = {
  match: any;
};

const EventContainer = ({ match }: Props) => {
  const { events } = useEventsState();
  return <div>Event {match.params.id}</div>;
};

export default EventContainer;
