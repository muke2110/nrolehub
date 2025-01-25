import React from 'react';
import SubEventCard from './SubEventCard';

function SubEventList({ subevents, eventId, onUpdate }) {
  if (!subevents?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No sub-events available for this event.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {subevents.map((subevent) => (
        <SubEventCard
          key={subevent.id}
          subevent={subevent}
          eventId={eventId}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default SubEventList;