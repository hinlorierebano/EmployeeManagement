import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EmployeeForm from './pages/employees/EmployeeForm';
import EmployeeList from './pages/employees/EmployeeList';
import ReviewList from './pages/reviews/ReviewList';
import ReviewForm from './pages/reviews/ReviewForm';
import ReviewTemplateList from './pages/reviewTemplates/ReviewTemplateList';
import ReviewTemplateForm from './pages/reviewTemplates/ReviewTemplateForm';
import ReviewCriteriaList from './pages/reviewCriterias/ReviewCriteriaList';
import ReviewCriteriaForm from './pages/reviewCriterias/ReviewCriteriaForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
        <Route path="/employees/create" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
        <Route path="/employees/edit/:id" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />

        <Route path="/reviews" element={<PrivateRoute><ReviewList /></PrivateRoute>} />
        <Route path="/reviews/create" element={<PrivateRoute><ReviewForm /></PrivateRoute>} />
        <Route path="/reviews/edit/:id" element={<PrivateRoute><ReviewForm /></PrivateRoute>} />

        <Route path="/review-templates" element={<PrivateRoute><ReviewTemplateList /></PrivateRoute>} />
        <Route path="/review-templates/create" element={<PrivateRoute><ReviewTemplateForm /></PrivateRoute>} />
        {/* Changed from /review-templates/edit/:id to /review-templates/:id/edit to match your URL pattern */}
        <Route path="/review-templates/:id/edit" element={<PrivateRoute><ReviewTemplateForm /></PrivateRoute>} /> 

        <Route path="/review-criterias" element={<PrivateRoute><ReviewCriteriaList /></PrivateRoute>} />
        <Route path="/review-criterias/create" element={<PrivateRoute><ReviewCriteriaForm /></PrivateRoute>} />
        <Route path="/review-criterias/edit/:id" element={<PrivateRoute><ReviewCriteriaForm /></PrivateRoute>} />

      </Routes>
    </Router>
  );
};

export default App;