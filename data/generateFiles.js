import fs from "fs";
import path from "path";

import events from "./events.js";

const eventsFolder = "./events";

// Ensure the events folder exists
if (!fs.existsSync(eventsFolder)) {
  fs.mkdirSync(eventsFolder);
}

// Iterate over each event and write a JSON file for each
events.forEach((event) => {
  const eventDate = event.event_date;
  const parts = eventDate.split("/");
  const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

  const eventType =
    event.event_type && event.event_type.length > 0
      ? event.event_type[0]
      : "unknown";

  let fileName;

  fileName = `${formattedDate}_${eventType}.json`;

  const filePath = path.join(eventsFolder, fileName);

  // Write the event object to a JSON file
  fs.writeFileSync(filePath, JSON.stringify(event, null, 2), "utf-8");

  console.log(
    `File "${fileName}" created successfully in the "events" folder.`,
  );
});
