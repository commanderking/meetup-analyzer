import React from "react";
import {
  AttendanceHistory,
  MemberAttendanceHistory
} from "requests/attendanceHistoryTypes";
import {
  getAttendanceRateForMembersWithAtLeastOneMeetupAttended,
  getAttendanceRateForPreviousAttendees,
  getPredictedShowRate
} from "features/attendancePredictor/attendancePredictorUtils";

const AttendanceHistoryResults = ({
  attendanceHistory,
  attendeeIds
}: {
  attendanceHistory: AttendanceHistory;
  attendeeIds: string[];
}) => {
  const memberHistory = getAttendanceRateForMembersWithAtLeastOneMeetupAttended(
    attendanceHistory
  );
  const membersWitHistoryRate = getAttendanceRateForPreviousAttendees(
    attendanceHistory
  );
  const predictedShowRate = getPredictedShowRate(
    attendanceHistory,
    attendeeIds
  );
  console.log("attendanceHistory", attendanceHistory);
  console.log("memberHistory", memberHistory);
  console.log("membersWitHistoryRate", membersWitHistoryRate);
  console.log("attendeeIds", attendeeIds);
  console.log("predictedShowRate", predictedShowRate);

  console.log("oldTimers", attendanceHistory.memberAttendanceHistory.length);
  console.log(
    "newTimers",
    attendeeIds.length - attendanceHistory.memberAttendanceHistory.length
  );
  return <div>Results</div>;
};

export default AttendanceHistoryResults;
