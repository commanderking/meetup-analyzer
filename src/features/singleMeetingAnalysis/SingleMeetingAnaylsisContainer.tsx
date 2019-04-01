import React, { useState } from "react";
import csv from "csvtojson";
import { bindRawMeetupData } from "./SingleMeetingAnalysisUtils";
import { SingleMeetupSummary } from "./SingleMeetupSummary";
import MeetupMembersSummary from "./MeetupMembersSummary";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const SingleMeetingAnalysisContainer = () => {
  const [rawMeetupData, setMeetupData] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [attendees, setAttendees]: [any[], any] = useState([]);

  const handleChange = (event: any) => {
    setMeetupData(event.target.value);
  };

  const handleEventDateChange = (event: any) => {
    setEventDate(event.target.value);
  };

  const submitJSON = (event: any) => {
    event.preventDefault();
    csv()
      .fromString(rawMeetupData)
      .then(result => {
        const bindedData = bindRawMeetupData(result);
        setAttendees(bindedData);
      });
  };

  return (
    <div>
      {attendees.length === 0 && (
        <div>
          <h1>Enter Meetup Attendance CSV Data</h1>
          <form>
            <div>
              <label>
                Event Date:{" "}
                <input
                  value={eventDate}
                  placeholder="MM/DD/YYYY"
                  onChange={handleEventDateChange}
                />
              </label>
            </div>
            <div>
              <label>
                Event Attendance Data:{" "}
                <textarea value={rawMeetupData} onChange={handleChange} />
              </label>
              <div />
              <button type="submit" onClick={submitJSON}>
                Summarize Data
              </button>
            </div>
          </form>
        </div>
      )}
      {attendees.length > 0 && (
        <React.Fragment>
          <h1>Meeting Statistics</h1>
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
