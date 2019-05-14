export type EventData = {
  eventName: string;
  eventDate: string;
  // meetupEventId: string;
};

export type AttendeeData = {
  userId: string | null;
  didAttend: boolean;
  didRSVP: boolean;
  title: string;
  eventHost: string;
  rsvpDate: Date | null;
  dateJoinedGroup: Date | null;
};
