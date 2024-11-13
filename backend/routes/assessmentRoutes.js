import { Router } from 'express';
const router = Router();
import { createAssessment, updateAssessment, getAssessmentByJobId } from '../controllers/assessmentController.js';

// Route to create a new assessment
router.post('/', createAssessment);

// Route to update an existing assessment
router.put('/:id', updateAssessment);

// Route to get an assessment by jobId
router.get('/:jobId', getAssessmentByJobId);

export default router;
