import React from 'react';
import { validateEventForm } from '../../../lib/validation';
import { useAuth } from '../../../contexts/AuthContext';

function EventForm({ initialData = {}, onSubmit, submitText = 'Submit' }) {
  const { user } = useAuth();
  const [formData, setFormData] = React.useState({
    event_name: '',
    description: '',
    start_date: '',
    end_date: '',
    venue: '',
    eligibility_criteria: '',
    created_by: user?.id,
    ...initialData
  });

  const [errors, setErrors] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure created_by is set
    const dataToSubmit = {
      ...formData,
      created_by: user?.id
    };

    const validationErrors = validateEventForm(dataToSubmit);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(dataToSubmit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Event Name</label>
        <input
          type="text"
          name="event_name"
          className={`input ${errors.event_name ? 'border-red-500' : ''}`}
          value={formData.event_name}
          onChange={handleChange}
        />
        {errors.event_name && (
          <p className="text-red-500 text-sm mt-1">{errors.event_name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          className="input"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="datetime-local"
            name="start_date"
            className={`input ${errors.start_date ? 'border-red-500' : ''}`}
            value={formData.start_date}
            onChange={handleChange}
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="datetime-local"
            name="end_date"
            className={`input ${errors.end_date ? 'border-red-500' : ''}`}
            value={formData.end_date}
            onChange={handleChange}
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Venue</label>
        <input
          type="text"
          name="venue"
          className={`input ${errors.venue ? 'border-red-500' : ''}`}
          value={formData.venue}
          onChange={handleChange}
        />
        {errors.venue && (
          <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Eligibility Criteria</label>
        <textarea
          name="eligibility_criteria"
          className="input"
          rows="2"
          value={formData.eligibility_criteria}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        {submitText}
      </button>
    </form>
  );
}

export default EventForm;