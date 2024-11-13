import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectItem } from './ui/select';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';

const AssessmentForm = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);

  // Fetch jobs from the backend
  useEffect(() => {
    axios.get('/api/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1], 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = parseInt(value, 10);
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/assessments', { jobId: selectedJob, questions });
      toast.success('Assessment created successfully!');
    } catch (error) {
      toast.error('Error creating assessment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Select Job</Label>
        <Select value={selectedJob} onChange={handleJobChange} required>
          <SelectItem value="">Select a job</SelectItem>
          {jobs.map(job => (
            <SelectItem key={job._id} value={job._id}>{job.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div>
        {questions.map((q, index) => (
          <div key={index} className="space-y-2">
            <Label>Question {index + 1}</Label>
            <Input
              type="text"
              value={q.questionText}
              onChange={e => handleQuestionChange(index, 'questionText', e.target.value)}
              required
              placeholder="Enter question text"
            />
            {q.options.map((option, optIndex) => (
              <div key={optIndex}>
                <Label>Option {optIndex + 1}</Label>
                <Input
                  type="text"
                  value={option}
                  onChange={e => handleQuestionChange(index, `option-${optIndex}`, e.target.value)}
                  required
                  placeholder={`Enter option ${optIndex + 1}`}
                />
              </div>
            ))}
            <Label>Correct Answer (0-3)</Label>
            <Input
              type="number"
              min="0"
              max="3"
              value={q.correctAnswer}
              onChange={e => handleQuestionChange(index, 'correctAnswer', e.target.value)}
              required
            />
          </div>
        ))}
      </div>
      <Button type="button" onClick={addQuestion} className="mt-4">Add Question</Button>
      <Button type="submit" className="mt-4">Save Assessment</Button>
    </form>
  );
};

export default AssessmentForm;
