import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const ReviewForm = () => {
  const { id, employeeId } = useParams(); // null for create, number for edit
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    title: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
    }
  };

  const fetchReview = async () => {
    setLoadingReview(true);
    try {
      const res = await axios.get(`/reviews/${id}`);
      setFormData({
        employee_id: res.data.employee_id || '',
        title: res.data.title || '',
        comments: res.data.comments || ''
      });
    } catch (err) {
      console.error('Failed to fetch review', err);
    } finally {
      setLoadingReview(false);
    }
  };

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      if (id) {
        await axios.put(`/reviews/${id}`, formData);
      } else {
        await axios.post('/reviews', formData);
      }
      navigate('/reviews');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error('Submit failed:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    if (id) fetchReview();
  }, [id]);

  if (id && loadingReview) {
    return <div className="container mt-4">Loading review data...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Review' : 'Add Review'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employee_id" className="form-label">Employee</label>
          <select
            className={`form-select ${errors.employee_id ? 'is-invalid' : ''}`}
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          {errors.employee_id && <div className="invalid-feedback">{errors.employee_id[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Review Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="comments" className="form-label">Comments</label>
          <textarea
            className={`form-control ${errors.comments ? 'is-invalid' : ''}`}
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
          {errors.comments && <div className="invalid-feedback">{errors.comments[0]}</div>}
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/reviews')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update Review' : 'Create Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
