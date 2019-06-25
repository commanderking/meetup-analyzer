export type MemberAttendanceHistory = {
  eventsAttendedCount: number;
  eventsRSVPedCount: number;
  meetupUserId: number;
};

export type AttendanceHistory = {
  attendeeHistoryForThoseWhoAttendedOnlyOneMeetup: {
    attended: number;
    rsvped: number;
  };
  memberAttendanceHistory: MemberAttendanceHistory[];
};
