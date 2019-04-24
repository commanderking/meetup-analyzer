import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { css, jsx } from "@emotion/core";

const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
    const { dayOfWeek, displayDate, count } = payload[0].payload;
    return (
      <div
        id="tooltip"
        css={css`
          background-color: red;
          text-align: left;
          padding: 10px;
        `}
        style={{ backgroundColor: "white", padding: "10px", textAlign: "left" }}
      >
        <div>
          {dayOfWeek}, {displayDate}
        </div>
        <div>Signups: {count}</div>
      </div>
    );
  }
  return null;
};

const SignUpAreaChart = ({ data }: any) => {
  const react = React;
  return (
    <div>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="displayDate" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default SignUpAreaChart;
