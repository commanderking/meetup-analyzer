import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

type AttendanceCardProps = {
  headerText: string;
  bodyText: number | string;
  subBodyText?: string;
};

const AttendanceCard = ({
  headerText,
  bodyText,
  subBodyText
}: AttendanceCardProps) => {
  const react = React;
  return (
    <div
      css={css`
         {
          background-color: #bcbec0;
          margin: auto;
          width: 80%;
          margin-bottom: 20px;
          height: 100%;
        }
      `}
    >
      <h4
        css={css`
           {
            background-color: #d3d3d3;
            padding: 10px;
          }
        `}
      >
        {headerText}
      </h4>
      <div
        css={css`
           {
            padding: ${subBodyText ? 10 : 20}px;
          }
        `}
      >
        <h2
          css={css`
             {
              margin-bottom: 0;
            }
          `}
        >
          {bodyText}
        </h2>
        {subBodyText && <div>({subBodyText})</div>}
      </div>
    </div>
  );
};

export default AttendanceCard;
