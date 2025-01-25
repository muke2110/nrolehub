const Event = require('./events.model');
const StudentRegistration = require('./studentRegistration.model');
const { sequelize } = require('../../config/dataBase');

exports.getAllEvents = async (page, limit) => {
  const offset = (page - 1) * limit;
  return Event.findAndCountAll({ offset, limit });
};

exports.getEventById = async (eventId) => {
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error('Event not found');
  return event;
};

exports.getParticipantsCount = async (eventId, subEventId = null) => {
  const where = {
    event_id: eventId,
    payment_status: 'paid'
  };
  
  if (subEventId) {
    where.subevent_id = subEventId;
  }
  
  return StudentRegistration.count({ where });
};