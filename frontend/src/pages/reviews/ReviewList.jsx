
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/reviews'); // Make sure your backend includes employee info
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      setLoadingDelete(true);
      await axios.delete(`/reviews/${reviewToDelete}`);
      setReviewToDelete(null);
      await fetchReviews();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-dark" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
        <h2>Reviews</h2>
        <button className="btn btn-primary" onClick={() => navigate('/reviews/create')}>
          Add Review
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Employee</th>
            <th>Title</th>
            <th>Comments</th>
            <th style={{ width: '160px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <tr key={review.id}>
                <td>{review.employee?.name || 'Unknown'}</td>
                <td>{review.title}</td>
                <td>{review.comments}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/reviews/edit/${review.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => setReviewToDelete(review.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No reviews found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Are you sure you want to delete this review?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={loadingDelete}
                data-bs-dismiss="modal"
                onClick={confirmDelete}
              >
                {loadingDelete ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
