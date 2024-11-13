const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

// Route to create a new assessment
router.post('/', assessmentController.createAssessment);

// Route to update an existing assessment
router.put('/:id', assessmentController.updateAssessment);

// Route to get an assessment by jobId
router.get('/:jobId', assessmentController.getAssessmentByJobId);

module.exports = router;
