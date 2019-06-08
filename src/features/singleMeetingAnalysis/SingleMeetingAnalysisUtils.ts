import Moment from "moment";
import { extendMoment } from "moment-range";
import _ from "lodash";

import {
  RawAttendeeData,
  AttendeeData,
  RelativeMeetupRegistrationDates
} from "./SingleMeetupTypes";

// @ts-ignore
const moment = extendMoment(Moment);
const defaultAttendedMarker = "Y";

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
  attendee: AttendeeData,
  eventDate: Date
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
  attendees: AttendeeData[],
  eventDate: string
): RelativeMeetupRegistrationDates => {
  return attendees
    .filter(attendee => isMeetupGroupMemberAttendee(attendee))
    .reduce(
      (acc, currentAttendee) => {
        return getRelativeRegistrationDate(
          acc,
          currentAttendee,
          new Date(eventDate)
        );
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

export const getMeetupMembersWhoRSVPd = (
  attendees: AttendeeData[],
  eventDate: string
): RelativeMeetupRegistrationDates => {
  return attendees
    .filter(attendee => Boolean(attendee.didRSVP))
    .reduce(
      (acc, currentAttendee) =>
        getRelativeRegistrationDate(acc, currentAttendee, new Date(eventDate)),
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

export const getFirstDateAttendeeSignedUp = (attendees: AttendeeData[]) => {
  return attendees.reduce((earliestDate: any, attendee: AttendeeData) => {
    return attendee.rsvpDate && moment(attendee.rsvpDate) < earliestDate
      ? moment(attendee.rsvpDate)
      : earliestDate;
  }, moment());
};

// TODO: Type this better
const weekdayNumberToTextMap: any = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

const createInitialSignups = (days: number, firstDate: any) => {
  let initialSignups: any = {};
  _.times(days + 1, index => {
    const dateOfSignup = moment(firstDate).add(index, "days");
    const dayOfWeek = weekdayNumberToTextMap[dateOfSignup.day()];

    const displayDate = `${dateOfSignup.month() + 1}/${dateOfSignup.date()}`;

    initialSignups[index] = {
      daysSinceFirstSignupDay: index,
      rawDate: dateOfSignup,
      count: 0,
      dayOfWeek,
      displayDate
    };
  });

  return initialSignups;
};

export const getSignupsPerDay = (
  attendees: AttendeeData[],
  eventDate: string
) => {
  const firstDate = getFirstDateAttendeeSignedUp(attendees);
  const difference =
    moment()
      .range(firstDate, new Date(eventDate))
      .diff("days") + 1;

  console.log("difference", difference);

  const attendeesWhoRSVPd = attendees.filter(attendee => attendee.didRSVP);

  console.log("attendeesWhoRSVPd", attendeesWhoRSVPd);
  const initialSignups = createInitialSignups(difference, firstDate);

  return attendeesWhoRSVPd.reduce((acc: any, attendee: AttendeeData) => {
    const signupDate =
      (attendee.rsvpDate && moment(attendee.rsvpDate)) ||
      moment(new Date(eventDate));

    const daysAfterFirstDay =
      moment()
        .range(firstDate, signupDate)
        .diff("days") + 1;
    console.log("signupDate", signupDate);
    console.log("daysAfterFirstDay", daysAfterFirstDay);

    return {
      ...acc,
      [daysAfterFirstDay]: {
        ...acc[daysAfterFirstDay],
        count: acc[daysAfterFirstDay].count + 1
      }
    };
  }, initialSignups);
};

export const getSignupsAccumulated = (
  attendees: AttendeeData[],
  eventDate: string
) => {
  const signupsPerDay = getSignupsPerDay(attendees, eventDate);

  const signupsAfterFirstDay = _.omit(signupsPerDay, "0");
  const accumulatedSignUpsPerDay = _.reduce(
    signupsAfterFirstDay,
    (acc, day) => {
      return {
        ...acc,
        [day.daysSinceFirstSignupDay]: {
          ...day,
          // @ts-ignore
          count: day.count + acc[day.daysSinceFirstSignupDay - 1].count
        }
      };
    },
    { 0: signupsPerDay["0"] }
  );
  return accumulatedSignUpsPerDay;
};
