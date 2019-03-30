import React from "react";
import { getSummaryData } from "./SingleMeetingAnalysisUtils";

export const SingleMeetupSummary = ({ attendees }: { attendees: any[] }) => {
  const summary = getSummaryData(attendees);
  const { numberRSVPs, numberAttendees, attendeesWhoRSVPd } = summary;
  return (
    <div>
      <h2>Summary of Meetup</h2>
      <ul>
        <li>Number of RSVPs: {numberRSVPs}</li>
        <li>Number of Attendees: {numberAttendees}</li>
        <li>Number of Attendees who RSVP'd: {attendeesWhoRSVPd}</li>
        <li>
          Attendance % for those who RSVP'd:
          {`${Math.round((attendeesWhoRSVPd / numberRSVPs) * 100)}%`}
        </li>
      </ul>
    </div>
  );
};
