const Complaint = require('./complaints.model');
const studentRegistations = require('../events/studentRegistration.model')

exports.createComplaint = async (complaintData) => {
  console.log(complaintData.body);
  //check in studentRegistrations table if that user is present in that event or not
  try{
    const studentRegistration = await studentRegistations.findOne({where: {student_id: complaintData.body.student_id, event_id: complaintData.body.event_id}})
      if(!studentRegistration){
        throw new Error('Student is not registered for this event')
        }
        const complaint = await Complaint.create(complaintData.body)
        return complaint
  }catch(error){
    console.log(error);
    throw new Error(error.message)
  }
};

exports.getComplaintsByStudent = async (studentId) => {
  return Complaint.findAll({ where: { student_id: studentId } });
};

