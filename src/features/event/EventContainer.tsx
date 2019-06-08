import React, { useEffect, useState } from "react";
import { useEventsState } from "../../context/eventsContext";
import { getAttendanceForEvents } from "../../requests/attendanceRequest";
import { SingleMeetupSummary } from "../singleMeetingAnalysis/SingleMeetupSummary";
import moment from "moment";
type Props = {
  match: any;
};

const getAttendance = async (eventId: string, setAttendance: any) => {
  const attendance = await getAttendanceForEvents([eventId]);
  await setAttendance(attendance);
};

const EventContainer = ({ match }: Props) => {
  const { events } = useEventsState();
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    const event = events.find(event => (event.id = match.params.id));
    console.log("event", event);
    if (event) {
      getAttendance(event.id, setAttendance);
    }
  }, []);

  const event = events.find(event => (event.id = match.params.id));

  console.log("attendance", attendance);

  return (
    <div>
      Event {match.params.id}
      <SingleMeetupSummary
        attendees={attendance}
        eventName={event.name || ""}
        eventDate={moment(event.date).format("MM/DD/YY") || ""}
      />
    </div>
  );
};

export default EventContainer;
