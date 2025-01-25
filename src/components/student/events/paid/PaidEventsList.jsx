import React from 'react';
import { usePaidEvents } from '../../../../lib/hooks/usePaidEvents';
import PaidEventCard from './PaidEventCard';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import EmptyState from '../../../shared/EmptyState';
import { Calendar } from 'lucide-react';

function PaidEventsList() {
  const { registrations, loading } = usePaidEvents();

  if (loading) return <LoadingSpinner />;

  if (!registrations.length) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Paid Events"
        message="You haven't registered for any events yet."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {registrations.map((registration) => (
        <PaidEventCard key={registration.id} registration={registration} />
      ))}
    </div>
  );
}

export default PaidEventsList;