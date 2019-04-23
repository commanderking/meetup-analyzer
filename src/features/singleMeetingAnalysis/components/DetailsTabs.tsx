import React from "react";
import MeetupMembersSummary from "./MeetupMembersSummary";
import MeetupMembersPercentageSummary from "./MeetupMembersPercentageSummary";
import SignupSummary from "./SignUpSummary";
import { AttendeeData } from "../SingleMeetupTypes";
import {
  getMeetupMembersWhoAttendedSummary,
  getMeetupMembersWhoRSVPd
} from "../SingleMeetingAnalysisUtils";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

type Props = {
  attendees: AttendeeData[];
  eventDate: string;
};

const DetailsTab = ({ attendees, eventDate }: Props) => {
  const react = React;
  const meetupMembersWhoAttended = getMeetupMembersWhoAttendedSummary(
    attendees,
    eventDate
  );

  const meetupMembersWhoRSVPd = getMeetupMembersWhoRSVPd(attendees, eventDate);

  return (
    <div
      id="MeetingStatistics"
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
      `}
    >
      <SignupSummary attendees={attendees} eventDate={eventDate} />
      <MeetupMembersPercentageSummary
        meetupMembersWhoAttended={meetupMembersWhoAttended}
        meetupMembersWhoRSVPd={meetupMembersWhoRSVPd}
      />

      <MeetupMembersSummary
        title="Attendees Joined This Meetup Within..."
        attendeesByDate={meetupMembersWhoAttended}
      />
      <MeetupMembersSummary
        title="RSVPers Joined This Meetup Within..."
        attendeesByDate={meetupMembersWhoRSVPd}
      />
    </div>
  );
};

export default DetailsTab;
