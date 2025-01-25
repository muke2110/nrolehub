import React from 'react';
import PaidEventsList from './paid/PaidEventsList';

function MyEvents() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Events</h1>
      <PaidEventsList />
    </div>
  );
}

export default MyEvents;