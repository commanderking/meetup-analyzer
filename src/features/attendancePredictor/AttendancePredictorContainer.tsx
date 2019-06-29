// @flow
import React, { useState } from "react";
import csv from "csvtojson";
import {
  bindRawMeetupData,
  getMeetupUserIds
} from "features/singleMeetingAnalysis/SingleMeetingAnalysisUtils";
import { getAttendanceHistoryForUsers } from "requests/attendanceHistoryRequest";
import AttendanceHistoryResults from "features/attendancePredictor/components/AttendanceHistoryResults";
import AttendanceHistoryForm from "features/attendancePredictor/components/AttendanceHistoryForm";

const loadAttendanceHistory = async (
  userIds: string[],
  setAttendanceHistory: any
) => {
  const attendanceHistory = await getAttendanceHistoryForUsers({ userIds });
  console.log("attendanceHistory", attendanceHistory);
  setAttendanceHistory(attendanceHistory);
};

const AttendancePredictorContainer = () => {
  const [rawMeetupData, setRawMeetupData] = useState("");
  const [attendanceHistory, setAttendanceHistory]: [any, any] = useState({
    attendeeHistoryForThoseWhoAttendedOnlyOneMeetup: {
      attended: 0,
      rsvped: 0
    },
    memberAttendanceHistory: []
  });

  const [attendeeIds, setAttendeeIds]: [string[], any] = useState([]);

  const submitJSON = (event: any) => {
    event.preventDefault();
    csv()
      .fromString(rawMeetupData)
      .then(result => {
        const bindedData = bindRawMeetupData(result);
        const attendeeIds = getMeetupUserIds(bindedData);
        loadAttendanceHistory(attendeeIds, setAttendanceHistory);
        setAttendeeIds(attendeeIds);
      });
  };

  return (
    <div>
      <AttendanceHistoryForm
        rawMeetupData={rawMeetupData}
        setRawMeetupData={setRawMeetupData}
        submitJSON={submitJSON}
      />
      <div>
        {attendanceHistory && (
          <AttendanceHistoryResults
            attendanceHistory={attendanceHistory}
            attendeeIds={attendeeIds}
          />
        )}
      </div>
    </div>
  );
};

export default AttendancePredictorContainer;
