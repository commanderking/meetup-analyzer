import moment from "moment";

import {
  RawAttendeeData,
  AttendeeData,
  RelativeMeetupRegistrationDates
} from "./SingleMeetupTypes";

const defaultAttendedMarker = "Y";
const eventDate = new Date("03/27/2019");

const attendedMeetup = (user: RawAttendeeData) => {
  return user.Attendance === defaultAttendedMarker ? true : false;
};

const didRSVP = (user: RawAttendeeData) => {
  return user.RSVP === "Yes" ? true : false;
};

export const bindRawMeetupData = (
  meetupData: RawAttendeeData[]
): AttendeeData[] => {
  return meetupData.map((user: RawAttendeeData) => {
    return {
      userId:
        user["User ID"] !== "" ? user["User ID"].replace("user ", "") : null,
      didAttend: attendedMeetup(user),
      didRSVP: didRSVP(user),
      title: user.Title,
      eventHost: user["Event Host"],
      rsvpDate: user["RSVPed on"] !== "" ? new Date(user["RSVPed on"]) : null,
      dateJoinedGroup: user["Joined Group on"]
        ? new Date(user["Joined Group on"])
        : null
    };
  });
};

const registeredWithin30DaysOfEvent = (
  dateJoined: Date,
  eventDate: Date
): boolean =>
  moment(dateJoined).isBetween(
    moment(eventDate).subtract(30, "days"),
    moment(eventDate)
  );

const registeredWithinPastSixMonthsOfEvent = (
  dateJoined: Date,
  eventDate: Date
): boolean =>
  moment(dateJoined).isBetween(moment(eventDate).subtract(180, "days"));

const registeredWithinPastYearOfEvent = (
  dateJoined: Date,
  eventDate: Date
): boolean =>
  moment(dateJoined).isBetween(
    moment(eventDate).subtract(365, "days"),
    moment(eventDate)
  );

const registeredWithinTwoYearsOfEvent = (
  dateJoined: Date,
  eventDate: Date
): boolean =>
  moment(dateJoined).isBetween(
    moment(eventDate).subtract(710, "days"),
    moment(eventDate)
  );

const getRelativeRegistrationDate = (
  acc: RelativeMeetupRegistrationDates,
  attendee: AttendeeData
) => {
  const { dateJoinedGroup } = attendee;
  if (!dateJoinedGroup) {
    return acc;
  }

  if (registeredWithin30DaysOfEvent(dateJoinedGroup, eventDate)) {
    return {
      ...acc,
      pastThirtyDays: acc.pastThirtyDays + 1
    };
  }

  if (registeredWithinPastSixMonthsOfEvent(dateJoinedGroup, eventDate)) {
    return {
      ...acc,
      pastSixMonths: acc.pastSixMonths + 1
    };
  }

  if (registeredWithinPastYearOfEvent(dateJoinedGroup, eventDate)) {
    return {
      ...acc,
      pastYear: acc.pastYear + 1
    };
  }

  if (registeredWithinTwoYearsOfEvent(dateJoinedGroup, eventDate)) {
    return {
      ...acc,
      pastTwoYears: acc.pastTwoYears + 1
    };
  }

  return {
    ...acc,
    overTwoYearsAgo: acc.overTwoYearsAgo + 1
  };
};

const isMeetupGroupMemberAttendee = (attendee: AttendeeData): boolean =>
  Boolean(attendee.didAttend && attendee.dateJoinedGroup && attendee.didRSVP);

const isAttendeeWhoJoinedMeetupForEvent = (attendee: AttendeeData): boolean => {
  const { rsvpDate, dateJoinedGroup, didAttend } = attendee;
  return Boolean(
    rsvpDate &&
      dateJoinedGroup &&
      didAttend &&
      moment(rsvpDate).isSame(dateJoinedGroup, "day")
  );
};

export const getMeetupMembersWhoAttendedSummary = (
  attendees: AttendeeData[]
): RelativeMeetupRegistrationDates => {
  return attendees
    .filter(attendee => isMeetupGroupMemberAttendee(attendee))
    .reduce(
      (acc, currentAttendee) => {
        return getRelativeRegistrationDate(acc, currentAttendee);
      },
      {
        pastThirtyDays: 0,
        pastSixMonths: 0,
        pastYear: 0,
        pastTwoYears: 0,
        overTwoYearsAgo: 0
      }
    );
};

export const getSummaryData = (attendees: AttendeeData[]) => {
  return attendees.reduce(
    (acc, currentAttendee) => {
      const { didRSVP, didAttend } = currentAttendee;

      return {
        ...acc,
        totalCount: acc.totalCount + 1,
        numberRSVPs: acc.numberRSVPs + (didRSVP ? 1 : 0),
        numberAttendees: acc.numberAttendees + (didAttend ? 1 : 0),
        attendeesWhoRSVPd:
          acc.attendeesWhoRSVPd +
          (isMeetupGroupMemberAttendee(currentAttendee) ? 1 : 0),
        attendeesWhoJoinedMeetupForEvent:
          acc.attendeesWhoJoinedMeetupForEvent +
          (isAttendeeWhoJoinedMeetupForEvent(currentAttendee) ? 1 : 0)
      };
    },
    {
      totalCount: 0,
      numberRSVPs: 0,
      numberAttendees: 0,
      attendeesWhoRSVPd: 0,
      attendeesWhoJoinedMeetupForEvent: 0
    }
  );
};
