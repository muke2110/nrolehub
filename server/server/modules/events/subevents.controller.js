const SubeventService = require('./subevents.service');

// Create a subevent
exports.createSubevent = async (req, res) => {
  try {
    const subevent = await SubeventService.createSubevent(req.body);
    res.status(201).json({ message: 'Subevent created and mapped successfully', subevent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get subevents for an event
exports.getSubeventsByEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const subevents = await SubeventService.getSubeventsByEvent(eventId);
    res.status(200).json(subevents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
