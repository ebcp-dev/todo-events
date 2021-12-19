import React from 'react';

import './Event.scss';

const Event = (props: {
  eventId: string;
  eventFrom: string;
  eventTo: string;
  eventContent: string;
}) => {
  return (
    <div>
      Event {props.eventId}: {props.eventContent}
      From: {props.eventFrom}
      To: {props.eventTo}
    </div>
  );
};

export default Event;
