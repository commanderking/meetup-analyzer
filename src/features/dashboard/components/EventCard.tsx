import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Card, CardText, CardSubtitle } from "reactstrap";
import moment from "moment";
import { EventResponse } from "../../../requests/eventTypes";
import EventCardStat from "./EventCardStat";

type Props = {
  event: EventResponse;
};

const EventCard = ({ event }: Props) => {
  const { name, date, attendees, rsvps } = event;

  const attendancePercent = `${Math.round((attendees / rsvps) * 100)}%`;
  return (
    <Card
      css={css`
         {
          padding: 25px;
        }
      `}
    >
      <h5>{name}</h5>
      <CardSubtitle>{moment(date).format("MM/DD/YY")}</CardSubtitle>
      <CardText>
        <div
          css={css`
             {
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
          `}
        >
          <EventCardStat stat={event.attendees} description="Attendees" />
          <EventCardStat stat={attendancePercent} description="Show Rate" />
        </div>
      </CardText>
    </Card>
  );
};

export default EventCard;
