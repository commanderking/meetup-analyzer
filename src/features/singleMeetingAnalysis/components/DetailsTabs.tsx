import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import SignupSummary from "./SignUpSummary";
import { AttendeeData } from "../SingleMeetupTypes";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import MeetupMembersSummary from "./MeetupMembersSummary";
type Props = {
  attendees: AttendeeData[];
  eventDate: string;
};

const Tabs = {
  MEETUP_SIGNUP: "SIGN_UP_DATES",
  ATTENDEE_HISTORY: "ATTENDEE_HISTORY"
};

const DetailsTab = ({ attendees, eventDate }: Props) => {
  const react = React;

  const [activeTab, setActiveTab] = useState(Tabs.MEETUP_SIGNUP);

  return (
    <div id="MeetingStatistics">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === Tabs.MEETUP_SIGNUP ? "active" : ""}
            onClick={() => {
              setActiveTab(Tabs.MEETUP_SIGNUP);
            }}
          >
            Sign Ups Over Time
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === Tabs.ATTENDEE_HISTORY ? "active" : ""}
            onClick={() => {
              setActiveTab(Tabs.ATTENDEE_HISTORY);
            }}
          >
            Attendee History
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={`${Tabs.MEETUP_SIGNUP}`}>
          <SignupSummary attendees={attendees} eventDate={eventDate} />
        </TabPane>
        <TabPane tabId={`${Tabs.ATTENDEE_HISTORY}`}>
          <MeetupMembersSummary eventDate={eventDate} attendees={attendees} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default DetailsTab;
