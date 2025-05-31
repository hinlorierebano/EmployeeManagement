#  Employee Performance Review Management System

This is a full-stack web application built using **Laravel (10/11)** for the backend and **ReactJS (18)** for the frontend. The system allows organizations to manage employee performance reviews, review criteria, and templates through a RESTful API interface.

---

##  Features

-  User authentication (Login/Logout)
-  Employee CRUD
-  Performance Review CRUD
-  Review Criteria and Template management
-  One-to-Many & Belongs-To relationships
-  Unit testing (Laravel)
-  Docker support for easy setup
-  RESTful API integration

---

##  Technology Stack

| Layer       | Technology     |
|-------------|----------------|
| Backend     | Laravel 10/11  |
| Frontend    | ReactJS 18     |
| API Auth    | Laravel Sanctum|
| Database    | MySQL          |
| Container   | Docker + Docker Compose |
| Testing     | PHPUnit        |
| Versioning  | Git + GitHub   |

---

##  Module Relationships

- **Employee → Reviews** (One-to-Many)
- **Review → Review Criteria** (One-to-Many)
- **Review Criteria → Review Template** (BelongsTo)

---

##  Modules Overview

### 1. **Employee**
- Add / Edit / Delete / View
- Linked to multiple reviews

### 2. **Performance Review**
- Linked to a specific employee
- Contains multiple criteria

### 3. **Review Criteria**
- Belongs to one review
- Linked to a review template

### 4. **Review Template**
- Defines the structure for reviews

---

##  Unit Testing

Run Laravel unit tests:
```bash
php artisan test
