import React, { useState } from 'react';
import './SurveyForm.css';

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    comments: '',
  });

  const totalSteps = 4;
  const progress = Math.round((step / totalSteps) * 100);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert(`Submitted:\n${JSON.stringify(formData, null, 2)}`);
    // TODO: send formData to backend here
  };

  return (
    <div className="survey-container">
      <h2>Survey / Feedback Form</h2>

      {/* Progress Bar */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{`Step ${step} of ${totalSteps} (${progress}%)`}</p>
      </div>

      {/* Form Steps */}
      {step === 1 && (
        <div className="form-step">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <label>How was your experience?</label>
          <select name="experience" value={formData.experience} onChange={handleChange}>
            <option value="">Select</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="okay">Okay</option>
            <option value="bad">Bad</option>
          </select>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <label>Additional Comments:</label>
          <textarea name="comments" rows="4" value={formData.comments} onChange={handleChange} />
        </div>
      )}

      {step === 4 && (
        <div className="form-step">
          <h3>Review Your Answers</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Experience:</strong> {formData.experience}</p>
          <p><strong>Comments:</strong> {formData.comments}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="form-navigation">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < totalSteps && <button onClick={nextStep}>Next</button>}
        {step === totalSteps && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default SurveyForm;
