import React from "react";
import { getSummaryData } from "./SingleMeetingAnalysisUtils";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const SingleMeetupSummary = ({ attendees }: { attendees: any[] }) => {
  const summary = getSummaryData(attendees);
  const {
    numberRSVPs,
    numberAttendees,
    attendeesWhoRSVPd,
    attendeesWhoJoinedMeetupForEvent
  } = summary;
  return (
    <div>
      <h3>Summary of Meetup</h3>
      <div
        css={css`
          text-align: left;
          margin: auto;
          width: 500px;
          display: grid;
          grid-template-columns: 5fr 1fr;
        `}
      >
        <div>RSVPs</div>
        <div> {numberRSVPs}</div>
        <div>Total Attendees</div>
        <div> {numberAttendees}</div>
        <div>Attendees who RSVP'd</div>
        <div> {attendeesWhoRSVPd}</div>
        <div>Attendees who joined group / signed up for event on same day</div>
        <div>{attendeesWhoJoinedMeetupForEvent}</div>
        <div>Percentage of RSVPs that Attended</div>
        <div>{`${Math.round((attendeesWhoRSVPd / numberRSVPs) * 100)}%`}</div>
      </div>
    </div>
  );
};
