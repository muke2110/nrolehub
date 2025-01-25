// Form validation utilities
export const validateEventForm = (formData) => {
  const errors = {};
  
  if (!formData.event_name?.trim()) {
    errors.event_name = 'Event name is required';
  }
  
  if (!formData.start_date) {
    errors.start_date = 'Start date is required';
  }
  
  if (!formData.end_date) {
    errors.end_date = 'End date is required';
  }
  
  if (new Date(formData.end_date) < new Date(formData.start_date)) {
    errors.end_date = 'End date must be after start date';
  }
  
  if (!formData.venue?.trim()) {
    errors.venue = 'Venue is required';
  }
  
  if (!formData.created_by) {
    errors.created_by = 'Creator ID is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};