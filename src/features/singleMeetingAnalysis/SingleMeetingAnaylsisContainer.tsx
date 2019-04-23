import React, { useState } from "react";
import { SingleMeetupSummary } from "./SingleMeetupSummary";
import SingleMeetingForm from "./components/SingleMeetingForm";
import { AttendeeData } from "./SingleMeetupTypes";
import DetailsTabs from "./components/DetailsTabs";

import _ from "lodash";

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
          <SingleMeetupSummary attendees={attendees} />
          <DetailsTabs attendees={attendees} eventDate={eventDate} />
        </React.Fragment>
      )}
    </div>
  );
};

export default SingleMeetingAnalysisContainer;
