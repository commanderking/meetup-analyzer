import React, { useEffect, useState } from "react";
import { useEventsState } from "../../context/eventsContext";
import { getAttendanceForEvents } from "../../requests/attendanceRequest";
import { SingleMeetupSummary } from "../singleMeetingAnalysis/SingleMeetupSummary";
import moment from "moment";
import { useEventsCall } from "../../context/eventsHook";
type Props = {
  match: any;
};

const getAttendance = async (eventId: string, setAttendance: any) => {
  const attendance = await getAttendanceForEvents([eventId]);
  await setAttendance(attendance);
};

const EventContainer = ({ match }: Props) => {
  const [attendance, setAttendance] = useState([]);
  const { isLoading } = useEventsCall();

  const { events } = useEventsState();
  console.log("events", events);
  useEffect(() => {
    const event = events.find(event => (event.id = match.params.id));
    if (event) {
      getAttendance(event.id, setAttendance);
    }
  }, [events]);

  const event = events.find(event => (event.id = match.params.id));
  if (isLoading) return <div>Loading...</div>;
  if (!event) return <div>No event found</div>;
  return (
    <div>
      <SingleMeetupSummary
        attendees={attendance}
        eventName={event.name}
        eventDate={moment(event.date).format("MM/DD/YY")}
      />
    </div>
  );
};

export default EventContainer;
