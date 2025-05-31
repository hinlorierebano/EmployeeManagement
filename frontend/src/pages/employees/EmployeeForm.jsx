import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/employees/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Failed to fetch employee:', error));
    }
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`/employees/${id}`, formData);
      } else {
        await axios.post('/employees', formData);
      }

      navigate('/employees');
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit' : 'Add'} Employee</h2>

      <div className="mb-3">
        <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/employees')}>
          Back to List
        </button>
        <button className="btn btn-outline-dark" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            name="position"
            className="form-control"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
