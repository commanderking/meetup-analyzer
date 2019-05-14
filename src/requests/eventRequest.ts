import { AttendeeData, EventData } from "./eventTypes";

const BACKEND_BASE_URL = "localhost:5000";
const EVENT_ENDPOINT = `${BACKEND_BASE_URL}/events`;

export const postEvent = async (event: EventData) => {
  console.log("event", event);
  try {
    const data = await fetch("http://localhost:5000/events", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(event)
    });

    const dataJson = await data.json();
    return dataJson;
  } catch (err) {
    console.log("err", err);
  }
};
