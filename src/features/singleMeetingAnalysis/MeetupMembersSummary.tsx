import React from "react";
import { getMeetupMembersWhoAttendedSummary } from "./SingleMeetingAnalysisUtils";
import { PieChart, Pie, Legend, Cell } from "recharts";
import _ from "lodash";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];

const CategoryDisplayNames = {
  pastThirtyDays: "Last 30 Days",
  pastSixMonths: "Last 6 Months",
  pastYear: "Past Year",
  pastTwoYears: "Past Two Years",
  overTwoYearsAgo: "2+ years ago"
};

const MeetupMemberSummary = ({
  attendees,
  eventDate
}: {
  attendees: any[];
  eventDate: string;
}) => {
  console.log("react", React);
  const summary = getMeetupMembersWhoAttendedSummary(attendees, eventDate);
  const keys = _.keys(summary);

  const pieChartData = _.map(keys, key => ({
    // @ts-ignore - need to type key to ensure it exists in summary?
    name: CategoryDisplayNames[key],
    // @ts-ignore - need to type key to ensure it exists in summary?
    value: summary[key]
  }));

  return (
    <div>
      <h2>Attendees Joined This Meetup Within...</h2>
      <PieChart width={650} height={250}>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={80}
          label
        >
          {pieChartData.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            );
          })}
        </Pie>
        <Legend layout="horizontal" />
      </PieChart>
    </div>
  );
};

export default MeetupMemberSummary;
