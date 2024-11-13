import Assessment from "../models/Assessment.js";
import { Job } from "../models/job.model.js";

// Create a new assessment
export const createAssessment = async (req, res) => {
    try {
        const { jobId, questions } = req.body;
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if an assessment already exists for the job
        const existingAssessment = await Assessment.findOne({ jobId });
        if (existingAssessment) {
            return res.status(400).json({
                message: "An assessment for this job already exists.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create a new assessment
        const newAssessment = await Assessment.create({ jobId, questions });
        return res.status(201).json({
            message: "Assessment created successfully.",
            success: true,
            assessment: newAssessment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// Update an existing assessment
export const updateAssessment = async (req, res) => {
    try {
        const { id } = req.params;
        const { questions } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Assessment ID is required.",
                success: false
            });
        }

        // Update the assessment
        const updatedAssessment = await Assessment.findByIdAndUpdate(
            id,
            { questions },
            { new: true, runValidators: true }
        );

        if (!updatedAssessment) {
            return res.status(404).json({
                message: "Assessment not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Assessment updated successfully.",
            success: true,
            assessment: updatedAssessment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// Get an assessment by jobId
export const getAssessmentByJobId = async (req, res) => {
    try {
        const { jobId } = req.params;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        const assessment = await Assessment.findOne({ jobId }).populate({
            path: 'job',
            select: 'title description company'
        });

        if (!assessment) {
            return res.status(404).json({
                message: "Assessment not found.",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            assessment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
