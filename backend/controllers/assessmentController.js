import Assessment from '../models/Assessment.js'; // Remove `{ findOne, findByIdAndUpdate }`
const existingAssessment = await Assessment.findOne({ jobId });
const assessment = await Assessment.findByIdAndUpdate(id, { questions }, { new: true, runValidators: true });


// Create a new assessment
export async function createAssessment(req, res) {
  const { jobId, questions } = req.body;

  try {
    // Check if an assessment already exists for the job
    const existingAssessment = await findOne({ jobId });
    if (existingAssessment) {
      return res.status(400).json({ message: 'Assessment for this job already exists.' });
    }

    const assessment = new Assessment({ jobId, questions });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update an existing assessment
export async function updateAssessment(req, res) {
  const { id } = req.params;
  const { questions } = req.body;

  try {
    const assessment = await findByIdAndUpdate(
      id,
      { questions },
      { new: true, runValidators: true }
    );
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found.' });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get an assessment by jobId
export async function getAssessmentByJobId(req, res) {
  const { jobId } = req.params;

  try {
    const assessment = await findOne({ jobId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found.' });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
