const express = require('express');
const router = express.Router();
const ComplaintsController = require('../../modules/complaint/complaints.controller')
const AuthMiddleware = require('../middleware/auth.middleware')

// Complaints Management
router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorize(["student"]),ComplaintsController.createComplaint);
router.get('/my-complaints', AuthMiddleware.authenticate, ComplaintsController.getComplaintsByStudent);

module.exports = router;
