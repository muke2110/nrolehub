const EventsService = require('./events.service');

exports.getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const events = await EventsService.getAllEvents(page, limit);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await EventsService.getEventById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};