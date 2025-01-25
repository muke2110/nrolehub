import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Award, Scroll } from 'lucide-react';
import StatsCard from './ui/StatsCard';
import RecentEvents from './events/RecentEvents';

function AdminHome() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Events"
          value="24"
          icon={Calendar}
          trend="+12%"
          to="/admin/events"
        />
        <StatsCard
          title="Active Students"
          value="156"
          icon={Users}
          trend="+5%"
        />
        <StatsCard
          title="Certificates Issued"
          value="89"
          icon={Scroll}
          trend="+8%"
          to="/admin/certificates"
        />
        <StatsCard
          title="Leaderboard Updates"
          value="12"
          icon={Award}
          trend="+2%"
          to="/admin/leaderboard"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentEvents />
        {/* Add more dashboard widgets here */}
      </div>
    </div>
  );
}

export default AdminHome;