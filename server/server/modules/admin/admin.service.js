const PaymentDetails = require('../payments/payment.model');
const Student_Registrations = require('../events/studentRegistration.model');
const { sequelize } = require('../../config/dataBase');
const Event = require('../events/events.model');
exports.createEvent = async (eventData) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Event.create(eventData, { transaction });
    await transaction.commit();
    return event;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error.message || 'Failed to create event');
  }
};

exports.updateEvent = async (eventId, eventData) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Event.findByPk(eventId);
    if (!event) throw new Error('Event not found');
    
    await event.update(eventData, { transaction });
    await transaction.commit();
    return event;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error.message || 'Failed to update event');
  }
};

exports.deleteEvent = async (eventId) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Event.findByPk(eventId);
    if (!event) throw new Error('Event not found');
    
    await event.destroy({ transaction });
    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error.message || 'Failed to delete event');
  }
};

exports.getEventRegistrations = async (eventId) => {
  try {
    const registrations = await Student_Registrations.findAll({
      where: { event_id: eventId },
      order: [['registration_date', 'DESC']],
      attributes: [
        'id', 
        'student_id', 
        'event_id', 
        'subevent_id', 
        'student_name', 
        'student_email',
        'payment_status',
        'attendance',
        'registration_date'
      ]
    });

    if (!registrations) {
      throw new Error('No registrations found');
    }

    return registrations;
  } catch (error) {
    console.error('Get event registrations error:', error);
    throw new Error('Failed to fetch registrations');
  }
};

exports.markAttendance = async (registrationId, present = true) => {
  const transaction = await sequelize.transaction();
  try {
    const registration = await Student_Registrations.findByPk(registrationId);
    if (!registration) {
      throw new Error('Registration not found');
    }

    if (registration.payment_status !== 'paid') {
      throw new Error('Cannot mark attendance for unpaid registration');
    }

    // Update the attendance status with the provided value
    await registration.update({ attendance: present }, { transaction });
    await transaction.commit();
    return registration;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error.message || 'Failed to mark attendance');
  }
};

exports.markBulkAttendance = async (eventId, subEventId, present = false) => {
  const transaction = await sequelize.transaction();
  try {
    // Update all paid registrations for the given event and subevent
    await Student_Registrations.update(
      { attendance: present },
      {
        where: {
          event_id: eventId,
          subevent_id: subEventId,
          payment_status: 'paid'
        },
        transaction
      }
    );

    await transaction.commit();
    
    // Return updated registrations
    return await Student_Registrations.findAll({
      where: {
        event_id: eventId,
        subevent_id: subEventId,
        payment_status: 'paid'
      }
    });
  } catch (error) {
    await transaction.rollback();
    throw new Error('Failed to update bulk attendance');
  }
};
