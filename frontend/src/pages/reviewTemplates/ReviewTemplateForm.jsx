import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const ReviewTemplateForm = () => {
  const [templateName, setTemplateName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTemplate();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchTemplate = async () => {
    try {
      console.log('Fetching template with ID:', id);
      const res = await axios.get(`/review-templates/${id}`);
      console.log('Full response:', res);
      console.log('Response data:', res.data);
      console.log('Response status:', res.status);

      const template = res.data;
      
      // More detailed logging
      console.log('Template object:', template);
      console.log('template_name:', template.template_name);
      console.log('description:', template.description);

      // Check if the response is wrapped in a data property
      const templateData = template.data ? template.data : template;
      
      setTemplateName(templateData.template_name || '');
      setDescription(templateData.description || '');
      
      console.log('Set templateName to:', templateData.template_name);
      console.log('Set description to:', templateData.description);
      
    } catch (error) {
      console.error('Error fetching template:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      setError('Failed to fetch template data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const payload = {
        template_name: templateName,
        description,
      };

      console.log('Submitting payload:', payload);

      if (id) {
        const response = await axios.put(`/review-templates/${id}`, payload);
        console.log('Update response:', response);
      } else {
        const response = await axios.post('/review-templates', payload);
        console.log('Create response:', response);
      }

      navigate('/review-templates');
    } catch (error) {
      console.error('Error saving template:', error);
      console.error('Error response:', error.response);
      setError('Failed to save template.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading template data...</p>
        {id && <p>Template ID: {id}</p>}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button className="btn btn-outline-dark" onClick={() => navigate('/review-templates')}>
          Back
        </button>
      </div>

      <h2>{id ? 'Edit' : 'Create'} Review Template</h2>
      {id && <p className="text-muted">Editing template ID: {id}</p>}

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="templateName" className="form-label">Template Name</label>
          <input
            type="text"
            className="form-control"
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
            placeholder="Enter template name"
          />
          <small className="text-muted">Current value: "{templateName}"</small>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Enter description (optional)"
          />
          <small className="text-muted">Current value: "{description}"</small>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default ReviewTemplateForm;