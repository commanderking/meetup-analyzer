import React from "react";
import { getSummaryData } from "./SingleMeetingAnalysisUtils";

export const SingleMeetupSummary = ({ attendees }: { attendees: any[] }) => {
  const summary = getSummaryData(attendees);
  const {
    numberRSVPs,
    numberAttendees,
    attendeesWhoRSVPd,
    attendeesWhoJoinedMeetupForEvent
  } = summary;
  console.log("summary", summary);
  return (
    <div>
      <h2>Summary of Meetup</h2>
      <ul>
        <li>RSVPs: {numberRSVPs}</li>
        <li>Total Attendees: {numberAttendees}</li>
        <li>Attendees who RSVP'd: {attendeesWhoRSVPd}</li>
        <li>
          Attendees who joined group and signed up for event on same day:{" "}
          {attendeesWhoJoinedMeetupForEvent}
        </li>
        <li>
          Percentage of RSVPs that Attended:
          {`${Math.round((attendeesWhoRSVPd / numberRSVPs) * 100)}%`}
        </li>
      </ul>
    </div>
  );
};
