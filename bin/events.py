import sys

import requests
import yaml
import icalendar
import os
import sys

# URL of the iCal file
ICAL_URL = os.getenv("ICAL_URL")

if ICAL_URL is None:
    sys.exit()

# Fetch the iCal file
response = requests.get(ICAL_URL)
response.raise_for_status()

# Parse the iCal file
calendar = icalendar.Calendar.from_ical(response.content)

events = []
for component in calendar.walk():
    if component.name == "VEVENT":
        event_name = icalendar.vText.from_ical(component.get("summary"))
        event_url = icalendar.vUri.from_ical(component.get("url", "N/A"))
        event_location = icalendar.vText.from_ical(component.get("location", icalendar.vText("N/A").to_ical))
        event_start = component.get("dtstart").dt.strftime("%b %d %b, %H:%M GMT")
        event_end = component.get("dtend").dt.strftime("%b %d %b, %H:%M GMT")
        duration = component.get("dtend").dt - component.get("dtstart").dt
        days = duration.days
        hours, remainder = divmod(duration.seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        event_duration = ""

        if days > 0:
            if hours > 0 or minutes > 0:
                event_duration += f"{days + 1} days"
            else:
                event_duration += f"{days} days"
        else:
            event_duration += f"{hours} hours"

            if minutes > 0:
                event_duration += f", {minutes} minutes"

        event = {
            "name": str(event_name),
            "link": str(event_url),
            "venue": {
                "name": str(event_location)
            },
            "schedule": {
                "start": event_start,
                "end": event_end,
                "duration": event_duration
            }
        }
        events.append(event)

# Save the events to a YAML file
with open("_data/events.yml", "w") as yaml_file:
    yaml.dump(events, yaml_file, default_flow_style=False)

print("YAML file generated successfully.")