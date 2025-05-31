import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const ReviewCriteriaForm = () => {
  const [formData, setFormData] = useState({
    review_id: '',
    criteria_name: '',
    score: '',
    review_template_id: ''
  });
  const [reviews, setReviews] = useState([]);
  const [reviewTemplates, setReviewTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    const initializeForm = async () => {
      try {
        // Fetch reviews and templates in parallel
        const [reviewsRes, templatesRes] = await Promise.all([
          axios.get('/reviews'),
          axios.get('/review-templates')
        ]);

        setReviews(reviewsRes.data);
        setReviewTemplates(templatesRes.data);

        // If editing, fetch the criteria data
        if (isEditing) {
          const criteriaRes = await axios.get(`/review-criterias/${id}`);
          const criteria = criteriaRes.data;
          
          setFormData({
            review_id: criteria.review_id || '',
            criteria_name: criteria.criteria_name || '',
            score: criteria.score || '',
            review_template_id: criteria.review_template_id || ''
          });
        }
      } catch (error) {
        console.error('Error initializing form:', error);
        setError('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    };

    initializeForm();
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.review_id) errors.push('Review is required');
    if (!formData.criteria_name.trim()) errors.push('Criteria name is required');
    if (!formData.score) errors.push('Score is required');
    if (isNaN(formData.score) || formData.score < 0) errors.push('Score must be a valid positive number');
    if (!formData.review_template_id) errors.push('Review template is required');

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        review_id: parseInt(formData.review_id),
        criteria_name: formData.criteria_name.trim(),
        score: parseFloat(formData.score),
        review_template_id: parseInt(formData.review_template_id)
      };

      if (isEditing) {
        await axios.put(`/review-criterias/${id}`, payload);
      } else {
        await axios.post('/review-criterias', payload);
      }

      navigate('/review-criterias');
    } catch (error) {
      console.error('Error saving criteria:', error);
      if (error.response?.data?.errors) {
        const backendErrors = Object.values(error.response.data.errors).flat();
        setError(backendErrors.join(', '));
      } else {
        setError('Failed to save review criteria.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  {isEditing ? 'Edit' : 'Create'} Review Criteria
                </h4>
                <button 
                  className="btn btn-outline-light btn-sm"
                  onClick={() => navigate('/review-criterias')}
                >
                  <i className="fas fa-arrow-left me-1"></i>
                  Back
                </button>
              </div>
            </div>

            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="review_id" className="form-label">
                    Review <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="review_id"
                    name="review_id"
                    value={formData.review_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a review...</option>
                    {reviews.map((review) => (
                      <option key={review.id} value={review.id}>
                        Review #{review.id} - {review.employee?.name || 'Unknown Employee'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="criteria_name" className="form-label">
                    Criteria Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="criteria_name"
                    name="criteria_name"
                    value={formData.criteria_name}
                    onChange={handleInputChange}
                    placeholder="e.g., Communication Skills, Technical Expertise"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="score" className="form-label">
                    Score <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="score"
                    name="score"
                    value={formData.score}
                    onChange={handleInputChange}
                    placeholder="Enter score (e.g., 85, 4.5)"
                    step="0.1"
                    min="0"
                    required
                  />
                  <div className="form-text">
                    Enter a numeric score for this criteria
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="review_template_id" className="form-label">
                    Review Template <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="review_template_id"
                    name="review_template_id"
                    value={formData.review_template_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a template...</option>
                    {reviewTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.template_name}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    Select the template this criteria belongs to
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/review-criterias')}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'} me-2`}></i>
                        {isEditing ? 'Update' : 'Create'} Criteria
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCriteriaForm;