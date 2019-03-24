import { schema } from "normalizr";

import { venue } from "entities/venues";
import { office } from "entities/offices";
import { org } from "entities/orgs";
import { sanggu } from "entities/sanggu";
import { tag } from "entities/tags";

export const event = new schema.Entity("events", {
  event_logistics: [
    {
      venue
    }
  ],
  office_hosts: [office],
  org_hosts: [org],
  sanggu_hosts: [sanggu],
  tags: [tag]
});
