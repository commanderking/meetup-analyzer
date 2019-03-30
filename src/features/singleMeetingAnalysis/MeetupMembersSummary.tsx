import React from "react";
import { getMeetupMembersWhoAttendedSummary } from "./SingleMeetingAnalysisUtils";

const MeetupMemberSummary = ({ attendees }: { attendees: any[] }) => {
  const summary = getMeetupMembersWhoAttendedSummary(attendees);
  console.log("summary", summary);
  return <div>Meetup Member Breakdown</div>;
};

export default MeetupMemberSummary;
