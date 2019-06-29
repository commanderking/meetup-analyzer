export type MemberAttendanceHistory = {
  attended: number;
  rsvped: number;
  meetupUserId: number;
};

export type AttendanceHistory = {
  attendeeHistoryForThoseWhoAttendedOnlyOneMeetup: {
    attended: number;
    rsvped: number;
  };
  memberAttendanceHistory: MemberAttendanceHistory[];
};
