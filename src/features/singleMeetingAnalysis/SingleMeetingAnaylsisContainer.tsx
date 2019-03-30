import React, { useState } from "react";
import csv from "csvtojson";
import { bindRawMeetupData } from "./SingleMeetingAnalysisUtils";
import { SingleMeetupSummary } from "./SingleMeetupSummary";
import MeetupMembersSummary from "./MeetupMembersSummary";

const SingleMeetingAnalysisContainer = () => {
  const [rawMeetupData, setMeetupData] = useState("");
  const [attendees, setAttendees]: [any[], any] = useState([]);

  const handleChange = (event: any) => {
    setMeetupData(event.target.value);
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
      <h1>Meeting Statistics</h1>
      <form>
        <textarea value={rawMeetupData} onChange={handleChange} />
        <button type="submit" onClick={submitJSON}>
          Summarize Data
        </button>
        {attendees.length > 0 && <SingleMeetupSummary attendees={attendees} />}
        {attendees.length > 0 && <MeetupMembersSummary attendees={attendees} />}
      </form>
    </div>
  );
};

export default SingleMeetingAnalysisContainer;
