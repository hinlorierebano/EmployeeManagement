import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const ReviewCriteriaList = () => {
  const [criterias, setCriterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCriterias();
  }, []);

  const fetchCriterias = async () => {
    try {
      const response = await axios.get('/review-criterias');
      console.log('Fetched criterias:', response.data);
      setCriterias(response.data);
    } catch (error) {
      console.error('Error fetching criterias:', error);
      setError('Failed to fetch review criterias.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review criteria?')) {
      try {
        await axios.delete(`/review-criterias/${id}`);
        setCriterias(criterias.filter(criteria => criteria.id !== id));
      } catch (error) {
        console.error('Error deleting criteria:', error);
        setError('Failed to delete review criteria.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/review-criterias/${id}/edit`);
  };

  const handleCreate = () => {
    navigate('/review-criterias/create');
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Review Criterias</h2>
        <button className="btn btn-primary" onClick={handleCreate}>
          <i className="fas fa-plus me-2"></i>
          Create New Criteria
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {criterias.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No review criterias found.</p>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create Your First Criteria
          </button>
        </div>
      ) : (
        <div className="row">
          {criterias.map((criteria) => (
            <div key={criteria.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title text-primary">
                      {criteria.criteria_name}
                    </h5>
                    <span className="badge bg-success fs-6">
                      Score: {criteria.score}
                    </span>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted d-block">
                      <strong>Review Template:</strong>
                    </small>
                    <span className="badge bg-info">
                      {criteria.review_template?.template_name || 'No Template'}
                    </span>
                  </div>

                  {criteria.review && (
                    <div className="mb-3">
                      <small className="text-muted d-block">
                        <strong>Associated Review:</strong>
                      </small>
                      <span className="text-secondary">
                        Review ID: {criteria.review.id}
                      </span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      ID: {criteria.id}
                    </small>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEdit(criteria.id)}
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(criteria.id)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {criterias.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-muted">
            Total: {criterias.length} review criteria{criterias.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCriteriaList;