import React, { useState } from "react";
import { SingleMeetupSummary } from "./SingleMeetupSummary";
import MeetupMembersSummary from "./MeetupMembersSummary";
import SingleMeetingForm from "./components/SingleMeetingForm";
import { AttendeeData } from "./SingleMeetupTypes";
import MeetupMembersPercentageSummary from "./components/MeetupMembersPercentageSummary";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  getMeetupMembersWhoAttendedSummary,
  getMeetupMembersWhoRSVPd
} from "./SingleMeetingAnalysisUtils";

const SingleMeetingAnalysisContainer = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [attendees, setAttendees]: [AttendeeData[], any] = useState([]);

  const meetupMembersWhoAttended = getMeetupMembersWhoAttendedSummary(
    attendees,
    eventDate
  );

  const meetupMembersWhoRSVPd = getMeetupMembersWhoRSVPd(attendees, eventDate);

  return (
    <div>
      {attendees.length === 0 && (
        <SingleMeetingForm
          attendees={attendees}
          setAttendees={setAttendees}
          eventName={eventName}
          eventDate={eventDate}
          setEventName={setEventName}
          setEventDate={setEventDate}
        />
      )}
      {attendees.length > 0 && (
        <React.Fragment>
          <h1>
            Meeting Statistics for {eventName} on {eventDate}
          </h1>
          <button
            onClick={() => {
              setAttendees([]);
            }}
          >
            Enter new Data
          </button>
          <div
            id="MeetingStatistics"
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
            `}
          >
            <SingleMeetupSummary attendees={attendees} />
            <MeetupMembersPercentageSummary
              meetupMembersWhoAttended={meetupMembersWhoAttended}
              meetupMembersWhoRSVPd={meetupMembersWhoRSVPd}
            />

            <MeetupMembersSummary
              title="Attendees Joined This Meetup Within..."
              attendeesByDate={meetupMembersWhoAttended}
            />
            <MeetupMembersSummary
              title="RSVPers Joined This Meetup Within..."
              attendeesByDate={meetupMembersWhoRSVPd}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SingleMeetingAnalysisContainer;
