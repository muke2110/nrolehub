import React from 'react';
import Modal from '../../../shared/Modal';
import { useAuth } from '../../../../contexts/AuthContext';
import api from '../../../../lib/api';
import toast from 'react-hot-toast';
import { IndianRupee } from 'lucide-react';

function CreateSubEventModal({ isOpen, onClose, eventId, onSubEventCreated }) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    fee: 0,
    event_id: eventId
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/subevents', formData);
      toast.success('Sub-event created successfully');
      onSubEventCreated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create sub-event');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Sub-Event">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Title
          </label>
          <input
            type="text"
            className="input w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter sub-event title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            className="input w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter sub-event description"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Registration Fee (₹)
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              className="input w-full pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={formData.fee}
              onChange={(e) => setFormData(prev => ({ ...prev, fee: parseFloat(e.target.value) }))}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Sub-Event
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateSubEventModal;