import React, { useState } from "react";
import { SingleMeetupSummary } from "./SingleMeetupSummary";
import SingleMeetingForm from "./components/SingleMeetingForm";
import { AttendeeData } from "./SingleMeetupTypes";
import DetailsTabs from "./components/DetailsTabs";
import { Button } from "reactstrap";
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
          <SingleMeetupSummary
            attendees={attendees}
            eventName={eventName}
            eventDate={eventDate}
          />
          <Button
            color="info"
            onClick={() => {
              setAttendees([]);
            }}
          >
            Enter new Data
          </Button>
          <DetailsTabs attendees={attendees} eventDate={eventDate} />
        </React.Fragment>
      )}
    </div>
  );
};

export default SingleMeetingAnalysisContainer;
