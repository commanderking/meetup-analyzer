import { AttendeeData, EventData } from "./eventTypes";

const BACKEND_BASE_URL = "localhost:5000";
const EVENT_ENDPOINT = `${BACKEND_BASE_URL}/events`;

type EventWithAttendees = EventData & { attendees: AttendeeData[] };

export const postEvent = async (eventWithAttendees: EventWithAttendees) => {
  console.log("event", eventWithAttendees);
  try {
    const data = await fetch("http://localhost:5000/events", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(eventWithAttendees)
    });

    const dataJson = await data.json();
    return dataJson;
  } catch (err) {
    console.log("err", err);
  }
};
