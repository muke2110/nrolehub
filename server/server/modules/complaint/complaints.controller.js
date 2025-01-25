const ComplaintsService = require('./complaints.service');

exports.createComplaint = async (req, res) => {
  try {
    const complaint = await ComplaintsService.createComplaint(req);
    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComplaintsByStudent = async (req, res) => {
  try {
    const complaints = await ComplaintsService.getComplaintsByStudent(req.user.id);

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
