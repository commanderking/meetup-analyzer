import moment from "moment";

type RawUserData = {
  Name: string;
  Attendance: string;
  "User ID": string;
  Title: string;
  "Event Host": string;
  RSVP: string;
  Guests: string;
  "RSVPed on": string;
  "Joined Group on": string;
  "URL of Member Profile": string;
  Notes: string;
};

type AttendeeData = {
  userId: string | null;
  didAttend: boolean;
  didRSVP: boolean;
  title: string;
  eventHost: string;
  rsvpDate: Date | null;
  dateJoinedGroup: Date | null;
};

const defaultAttendedMarker = "Y";

const attendedMeetup = (user: RawUserData) => {
  return user.Attendance === defaultAttendedMarker ? true : false;
};

const didRSVP = (user: RawUserData) => {
  return user.RSVP === "Yes" ? true : false;
};

export const bindRawMeetupData = (
  meetupData: RawUserData[]
): AttendeeData[] => {
  return meetupData.map((user: RawUserData) => {
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

const eventDate = new Date("03/27/2019");

type RelativeMeetupRegistrationDates = {
  pastThirtyDays: number;
  pastSixMonths: number;
  pastYear: number;
  pastTwoYears: number;
  overTwoYearsAgo: number;
};

const getRelativeRegistrationDate = (
  acc: RelativeMeetupRegistrationDates,
  attendee: AttendeeData
) => {
  const { didAttend, dateJoinedGroup, didRSVP } = attendee;
  if (!dateJoinedGroup) {
    return acc;
  }

  if (
    moment(dateJoinedGroup).isBetween(
      moment(eventDate).subtract(30, "days"),
      moment(eventDate)
    )
  ) {
    return {
      ...acc,
      pastThirtyDays: acc.pastThirtyDays + 1
    };
  }

  if (
    moment(dateJoinedGroup).isBetween(moment(eventDate).subtract(180, "days"))
  ) {
    return {
      ...acc,
      pastSixMonths: acc.pastSixMonths + 1
    };
  }

  if (
    moment(dateJoinedGroup).isBetween(
      moment(eventDate).subtract(365, "days"),
      moment(eventDate)
    )
  ) {
    return {
      ...acc,
      pastYear: acc.pastYear + 1
    };
  }

  if (
    moment(dateJoinedGroup).isBetween(
      moment(eventDate).subtract(710, "days"),
      moment(eventDate)
    )
  ) {
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

const isMeetupGroupMemberAttendee = (attendee: AttendeeData) => {
  return attendee.didAttend && attendee.dateJoinedGroup && attendee.didRSVP;
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
      const { didRSVP, didAttend, rsvpDate, dateJoinedGroup } = currentAttendee;

      return {
        ...acc,
        totalCount: acc.totalCount + 1,
        numberRSVPs: acc.numberRSVPs + (didRSVP ? 1 : 0),
        numberAttendees: didAttend
          ? acc.numberAttendees + 1
          : acc.numberAttendees,
        attendeesWhoRSVPd: isMeetupGroupMemberAttendee(currentAttendee)
          ? acc.attendeesWhoRSVPd + 1
          : acc.attendeesWhoRSVPd,
        attendeesWhoJoinedMeetupForEvent:
          acc.attendeesWhoJoinedMeetupForEvent +
          (rsvpDate &&
          dateJoinedGroup &&
          didAttend &&
          moment(rsvpDate).isSame(dateJoinedGroup, "day")
            ? 1
            : 0)
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
