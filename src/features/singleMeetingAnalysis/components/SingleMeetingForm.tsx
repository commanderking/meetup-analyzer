/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState } from "react";
import csv from "csvtojson";
import { bindRawMeetupData } from "../SingleMeetingAnalysisUtils";

// TODO: Update types here
const SingleMeetingForm = ({
  setAttendees,
  eventDate,
  setEventDate,
  eventName,
  setEventName
}: any) => {
  // Weird - without this, React is not defined
  console.log("react", React);

  const [rawMeetupData, setMeetupData] = useState("");

  const handleChange = (event: any) => {
    setMeetupData(event.target.value);
  };

  const handleEventDateChange = (event: any) => {
    setEventDate(event.target.value);
  };

  const handleEventNameChange = (event: any) => {
    setEventName(event.target.value);
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
      <h1>Enter Meetup Attendance CSV Data</h1>
      <form>
        <div>
          <label>
            Event Name:{" "}
            <input
              value={eventName}
              placeholder="UX in Ed Tech"
              onChange={handleEventNameChange}
            />
          </label>
        </div>
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
            Event Attendance Data: <br />
            <textarea
              css={css`
                 {
                  width: 500px;
                  height: 200px;
                }
              `}
              value={rawMeetupData}
              placeholder={"Enter csv data here..."}
              onChange={handleChange}
            />
          </label>
          <div />
          <button type="submit" onClick={submitJSON}>
            Summarize Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleMeetingForm;
