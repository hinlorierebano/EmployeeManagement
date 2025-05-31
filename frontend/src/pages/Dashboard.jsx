
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Employee Management</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h2 className="mb-4">Welcome to the Dashboard</h2>

        <div className="row g-3">
          <div className="col-md-4">
            <div className="card text-white bg-primary">
              <div className="card-body text-center">
                <h5 className="card-title">Employees</h5>
                <button
                  className="btn btn-light"
                  onClick={() => navigate('/employees')}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-success">
              <div className="card-body text-center">
                <h5 className="card-title">Reviews</h5>
                <button
                  className="btn btn-light"
                  onClick={() => navigate('/reviews')}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-info">
              <div className="card-body text-center">
                <h5 className="card-title">Templates</h5>
                <button
                  className="btn btn-light"
                  onClick={() => navigate('/review-templates')}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-md-5">
            <div className="card text-white bg-warning">
              <div className="card-body text-center">
                <h5 className="card-title">Review Criteria</h5>
                <button
                  className="btn btn-light"
                  onClick={() => navigate('/review-criterias')}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
