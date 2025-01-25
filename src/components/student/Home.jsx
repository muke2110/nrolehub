import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, Scroll, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import EventCalendar from '../shared/EventCalendar';

function StudentHome() {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: Calendar,
      title: 'Register for Events',
      description: 'Browse and register for upcoming events',
      link: '/student/events',
      color: 'text-primary',
    },
    {
      icon: Award,
      title: 'My Events',
      description: 'View your registered events and attendance',
      link: '/student/my-events',
      color: 'text-green-500',
    },
    {
      icon: Scroll,
      title: 'Certificates',
      description: 'Access your earned certificates',
      link: '/student/certificates',
      color: 'text-blue-500',
    },
    {
      icon: MessageSquare,
      title: 'Support',
      description: 'Get help and submit complaints',
      link: '/student/support',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-primary to-primary-dark text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username}!</h1>
        <p className="text-white/80">
          You have earned {user?.total_app_points} points so far
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="card hover:scale-105 transition-transform duration-300"
          >
            <action.icon className={`h-8 w-8 ${action.color} mb-4`} />
            <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
            <p className="text-gray-600 text-sm">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Calendar and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Event Calendar</h2>
          <EventCalendar />
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Your Next Events</h2>
          <div className="space-y-4">
            {/* Add upcoming events list here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;