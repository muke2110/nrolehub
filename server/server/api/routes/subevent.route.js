const express = require('express');
const router = express.Router();
const SubeventController = require('../../modules/events/subevents.controller');
const AuthMiddleware = require('../middleware/auth.middleware');

// Create a subevent (mapping happens automatically)
router.post('/', AuthMiddleware.authenticate, AuthMiddleware.authorize(['admin']), SubeventController.createSubevent);

// Get all subevents for a specific event
router.get('/:eventId', SubeventController.getSubeventsByEvent);

module.exports = router;
