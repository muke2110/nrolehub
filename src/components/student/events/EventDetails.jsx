import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import api from '../../../lib/api';
import SubEventList from './SubEventList';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { formatDate } from '../../../lib/utils';
import toast from 'react-hot-toast';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [subevents, setSubevents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const [eventResponse, subeventsResponse] = await Promise.all([
        api.get(`/events/${id}`),
        api.get(`/subevents/${id}`)
      ]);
      setEvent(eventResponse.data);
      setSubevents(subeventsResponse.data.subevents || []);
    } catch (error) {
      toast.error('Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{event?.event_name}</h1>
          <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
            {event?.venue}
          </span>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-gray-600 dark:text-gray-300">{event?.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Starts: {formatDate(event?.start_date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Clock className="h-5 w-5 text-primary" />
              <span>Ends: {formatDate(event?.end_date)}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Eligibility Criteria</h3>
            <p className="text-gray-600 dark:text-gray-300">{event?.eligibility_criteria}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sub Events</h2>
        <SubEventList subevents={subevents} eventId={id} onUpdate={fetchEventDetails} />
      </div>
    </div>
  );
}

export default EventDetails;