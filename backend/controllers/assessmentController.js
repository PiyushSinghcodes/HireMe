const Assessment = require('../models/Assessment');

// Create a new assessment
exports.createAssessment = async (req, res) => {
  const { jobId, questions } = req.body;

  try {
    // Check if an assessment already exists for the job
    const existingAssessment = await Assessment.findOne({ jobId });
    if (existingAssessment) {
      return res.status(400).json({ message: 'Assessment for this job already exists.' });
    }

    const assessment = new Assessment({ jobId, questions });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing assessment
exports.updateAssessment = async (req, res) => {
  const { id } = req.params;
  const { questions } = req.body;

  try {
    const assessment = await Assessment.findByIdAndUpdate(
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
};

// Get an assessment by jobId
exports.getAssessmentByJobId = async (req, res) => {
  const { jobId } = req.params;

  try {
    const assessment = await Assessment.findOne({ jobId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found.' });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
