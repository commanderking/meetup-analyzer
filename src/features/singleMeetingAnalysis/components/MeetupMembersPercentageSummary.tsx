import React from "react";
import { RelativeMeetupRegistrationDates } from "../SingleMeetupTypes";
type Props = {
  meetupMembersWhoAttended: RelativeMeetupRegistrationDates;
  meetupMembersWhoRSVPd: RelativeMeetupRegistrationDates;
};
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const calculatePercentage = (numerator: number, denominator: number) =>
  `${Math.round((numerator / denominator) * 100)}%`;

const MeetupMembersPercentageSummary = ({
  meetupMembersWhoAttended,
  meetupMembersWhoRSVPd
}: Props) => {
  console.log("react", React);
  return (
    <div>
      <h3>% of RSVPs who Attended By Meetup Sign Up Date</h3>
      <div
        id="AttendeePercentagesByMeetupRegistrationDate"
        css={css`
          display: grid;
          grid-template-columns: 3fr 1fr;
        `}
      >
        <div>Past Thirty Days</div>
        <div>
          {calculatePercentage(
            meetupMembersWhoAttended.pastThirtyDays,
            meetupMembersWhoRSVPd.pastThirtyDays
          )}
        </div>
        <div>Past Six Months</div>
        <div>
          {calculatePercentage(
            meetupMembersWhoAttended.pastSixMonths,
            meetupMembersWhoRSVPd.pastSixMonths
          )}
        </div>
        <div>Past Year</div>
        <div>
          {calculatePercentage(
            meetupMembersWhoAttended.pastYear,
            meetupMembersWhoRSVPd.pastYear
          )}
        </div>
        <div>Past Two Years</div>
        <div>
          {calculatePercentage(
            meetupMembersWhoAttended.pastTwoYears,
            meetupMembersWhoRSVPd.pastTwoYears
          )}
        </div>
        <div>More than 2 years</div>
        <div>
          {calculatePercentage(
            meetupMembersWhoAttended.overTwoYearsAgo,
            meetupMembersWhoRSVPd.overTwoYearsAgo
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetupMembersPercentageSummary;
