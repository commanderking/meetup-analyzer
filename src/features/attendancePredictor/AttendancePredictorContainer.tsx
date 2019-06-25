// @flow
import React, { useState } from "react";
import { Button, Label, FormGroup, Input, Form, Col } from "reactstrap";
import csv from "csvtojson";
import {
  bindRawMeetupData,
  getMeetupUserIds
} from "features/singleMeetingAnalysis/SingleMeetingAnalysisUtils";
import { AttendeeData } from "features/singleMeetingAnalysis/SingleMeetupTypes";
import { getAttendanceHistoryForUsers } from "requests/attendanceHistoryRequest";
import AttendanceHistoryResults from "features/attendancePredictor/components/AttendanceHistoryResults";

const labelColumns = 3;
const inputColumns = 9;

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
  const handleChange = (event: any) => {
    setRawMeetupData(event.target.value);
  };

  const submitJSON = (event: any) => {
    event.preventDefault();
    csv()
      .fromString(rawMeetupData)
      .then(result => {
        const bindedData = bindRawMeetupData(result);
        const attendeeIds = getMeetupUserIds(bindedData);
        loadAttendanceHistory(attendeeIds, setAttendanceHistory);
        setAttendeeIds(attendeeIds);
        console.log("attendeeIds", attendeeIds);
      });
  };

  return (
    <div>
      <Form>
        <div>
          <FormGroup row>
            <Label sm={labelColumns}>Event Attendance Data: </Label>
            <Col sm={inputColumns}>
              <Input
                rows={10}
                type="textarea"
                value={rawMeetupData}
                placeholder={"Enter csv data here..."}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <div />
        </div>
        <Button color="success" type="submit" onClick={submitJSON}>
          Summarize Data
        </Button>
      </Form>
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
