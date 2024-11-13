import { Schema, model } from 'mongoose';

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option
});

const assessmentSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, unique: true },
  questions: [questionSchema],
});

export default model('Assessment', assessmentSchema);
