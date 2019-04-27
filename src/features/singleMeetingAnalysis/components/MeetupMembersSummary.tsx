import React, { useState } from "react";
import MeetupMembersChart from "./MeetupMembersChart";
import MeetupMembersPercentageSummary from "./MeetupMembersPercentageSummary";
import { AttendeeData } from "../SingleMeetupTypes";
import {
  getMeetupMembersWhoAttendedSummary,
  getMeetupMembersWhoRSVPd
} from "../SingleMeetingAnalysisUtils";
import { ButtonGroup, Button } from "reactstrap";

type Props = {
  attendees: AttendeeData[];
  eventDate: string;
};

const MeetupMembers = {
  ATTENDEES: "ATTENDEES",
  RSVPERS: "RSVPERS"
};

const MeetupMembersSummary = ({ attendees, eventDate }: Props) => {
  const react = React;

  const [meetupMemberType, setMeetupMemberType] = useState(
    MeetupMembers.ATTENDEES
  );
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const meetupMembersWhoAttended = getMeetupMembersWhoAttendedSummary(
    attendees,
    eventDate
  );

  const meetupMembersWhoRSVPd = getMeetupMembersWhoRSVPd(attendees, eventDate);

  return (
    <div>
      <ButtonGroup>
        <Button
          size="sm"
          color={
            meetupMemberType === MeetupMembers.ATTENDEES ? "info" : "secondary"
          }
          onClick={() => {
            setMeetupMemberType(MeetupMembers.ATTENDEES);
          }}
        >
          Attendees
        </Button>
        <Button
          size="sm"
          color={
            meetupMemberType === MeetupMembers.RSVPERS ? "info" : "secondary"
          }
          onClick={() => {
            setMeetupMemberType(MeetupMembers.RSVPERS);
          }}
        >
          RSVPers
        </Button>
      </ButtonGroup>

      {meetupMemberType === MeetupMembers.ATTENDEES && (
        <MeetupMembersChart
          title="Attendees Joined This Meetup Within..."
          attendeesByDate={meetupMembersWhoAttended}
        />
      )}
      {meetupMemberType === MeetupMembers.RSVPERS && (
        <MeetupMembersChart
          title="RSVPers Joined This Meetup Within..."
          attendeesByDate={meetupMembersWhoRSVPd}
        />
      )}
    </div>
  );
};

/*
      <MeetupMembersPercentageSummary
        meetupMembersWhoAttended={meetupMembersWhoAttended}
        meetupMembersWhoRSVPd={meetupMembersWhoRSVPd}
      />
      */

export default MeetupMembersSummary;