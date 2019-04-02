import React, { useState } from "react";
import { SingleMeetupSummary } from "./SingleMeetupSummary";
import MeetupMembersSummary from "./MeetupMembersSummary";
import SingleMeetingForm from "./components/SingleMeetingForm";
import { AttendeeData } from "./SingleMeetupTypes";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const SingleMeetingAnalysisContainer = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [attendees, setAttendees]: [AttendeeData[], any] = useState([]);

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
            <MeetupMembersSummary attendees={attendees} eventDate={eventDate} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SingleMeetingAnalysisContainer;
