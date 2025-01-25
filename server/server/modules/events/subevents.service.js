const Subevent = require('./subevents.model');
const Event = require('./events.model');
const EventSubeventMapping = require('./eventsubeventmapping.model');
const StudentRegistration = require('./studentRegistration.model');
const { sequelize } = require('../../config/dataBase');

exports.createSubevent = async (subeventData) => {
  const { event_id, ...subeventDetails } = subeventData;

  const event = await Event.findByPk(event_id);
  if (!event) throw new Error('Event not found');

  const subevent = await Subevent.create(subeventDetails);
  await EventSubeventMapping.create({
    event_id,
    subevent_id: subevent.id,
  });

  return subevent;
};

exports.getSubeventsByEvent = async (eventId) => {
  const event = await Event.findByPk(eventId, {
    include: {
      model: Subevent,
      as: 'subevents',
      attributes: ['id', 'title', 'description', 'fee', 'certificate_Generated'],
    },
  });

  if (!event) throw new Error('Event not found');

  // Get participants count for each subevent
  const subeventsWithCount = await Promise.all(
    event.subevents.map(async (subevent) => {
      const participants_count = await StudentRegistration.count({
        where: {
          event_id: eventId,
          subevent_id: subevent.id,
          payment_status: 'paid'
        }
      });
      return {
        ...subevent.toJSON(),
        participants_count
      };
    })
  );

  return { ...event.toJSON(), subevents: subeventsWithCount };
};