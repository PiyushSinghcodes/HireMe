import { Router } from 'express';
const router = Router();
import { createAssessment, updateAssessment, getAssessmentByJobId } from '../controllers/assessmentController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Ensure this import exists

// Route to create a new assessment with authentication
router.post('/', isAuthenticated, createAssessment);

// Route to update an existing assessment with authentication
router.put('/:id', isAuthenticated, updateAssessment);

// Route to get an assessment by jobId with authentication
router.get('/:jobId', isAuthenticated, getAssessmentByJobId);

export default router;

