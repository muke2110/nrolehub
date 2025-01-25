const AdminService = require('./admin.service');

exports.createEvent = async (req, res) => {
  try {
    const event = await AdminService.createEvent(req.body);
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(400).json({ 
      success: false,
      message: error.message || 'Failed to create event'
    });
  }
};

exports.getEventRegistrations = async (req, res) => {
  try {
    const registrations = await AdminService.getEventRegistrations(req.params.id);
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to fetch registrations'
    });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    if (!req.params.registrationId) {
      return res.status(400).json({
        success: false,
        message: 'Registration ID is required'
      });
    }

    const present = req.body.present ?? true; // Default to true if not specified
    const registration = await AdminService.markAttendance(req.params.registrationId, present);
    res.status(200).json({
      success: true,
      message: `Attendance marked as ${present ? 'present' : 'absent'} successfully`,
      registration
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to mark attendance'
    });
  }
};

exports.markBulkAttendance = async (req, res) => {
  try {
    const { eventId, subEventId } = req.params;
    const { present = false } = req.body;

    const registrations = await AdminService.markBulkAttendance(
      parseInt(eventId),
      parseInt(subEventId),
      present
    );

    res.status(200).json({
      success: true,
      message: `Bulk attendance marked as ${present ? 'present' : 'absent'} successfully`,
      registrations
    });
  } catch (error) {
    console.error('Bulk attendance error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update bulk attendance'
    });
  }
};