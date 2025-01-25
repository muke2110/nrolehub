const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth.middleware');
const AdminController = require('../../modules/admin/admin.controller');

// Admin Actions
router.post('/events', AuthMiddleware.authenticate, AuthMiddleware.authorize(["admin"]), AdminController.createEvent);
router.get('/events/:id/registrations', AuthMiddleware.authenticate, AuthMiddleware.authorize(["admin"]), AdminController.getEventRegistrations);
router.put('/mark-attendance/:registrationId', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), AdminController.markAttendance);
router.put('/events/:eventId/subevents/:subEventId/bulk-attendance', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), AdminController.markBulkAttendance);

module.exports = router;