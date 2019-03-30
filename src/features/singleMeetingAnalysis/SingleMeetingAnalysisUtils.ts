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

type BindedAttendeeData = {
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
): BindedAttendeeData[] => {
  return meetupData.map((user: RawUserData) => {
    return {
      userId:
        user["User ID"] !== "" ? user["User ID"].replace("user ", "") : null,
      didAttend: attendedMeetup(user),
      didRSVP: didRSVP(user),
      title: user.Title,
      eventHost: user["Event Host"],
      rsvpDate: user["RSVPed on"] !== "" ? new Date(user["RSVPed on"]) : null,
      dateJoinedGroup: new Date(user["Joined Group on"])
    };
  });
};

export const getSummaryData = (attendees: BindedAttendeeData[]) => {
  return attendees.reduce(
    (acc, currentAttendee) => {
      return {
        ...acc,
        totalCount: acc.totalCount + 1,
        numberRSVPs: currentAttendee.didRSVP
          ? acc.numberRSVPs + 1
          : acc.numberRSVPs,
        numberAttendees: currentAttendee.didAttend
          ? acc.numberAttendees + 1
          : acc.numberAttendees,
        attendeesWhoRSVPd:
          currentAttendee.didRSVP && currentAttendee.didAttend
            ? acc.attendeesWhoRSVPd + 1
            : acc.attendeesWhoRSVPd
      };
    },
    {
      totalCount: 0,
      numberRSVPs: 0,
      numberAttendees: 0,
      attendeesWhoRSVPd: 0
    }
  );
};
