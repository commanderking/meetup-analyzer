import React from "react";

type Props = {
  match: any;
};

const EventContainer = ({ match }: Props) => {
  console.log("match", match);
  return <div>Event {match.params.id}</div>;
};

export default EventContainer;
