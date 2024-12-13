# 🛠️ Blaid Sharpening Co. API

Welcome to the **Knife Sharpening Co. API**! This application provides a platform to manage knife sharpening orders, customer profiles, and pricing information. Follow the instructions below to set up and run the app locally.

---

## 📋 **Table of Contents**
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)

---

## 🛠️ **Requirements**
Before running the app, ensure you have the following installed on your system:
- Python 3.9+
- pip (Python package manager)
- PostgreSQL (if using a database)
- Git

---

## 📥 **Installation**

1. Clone the repository:
   ```bash
   git clone https://git@github.com:An-him/Kisu.git

   cd knifesharpening-api


## 🛠️ ROUTES TO IMPLEMENT


| **METHOD** | **ROUTE**                 | **FUNCTIONALITY**                     | **ACCESS**      |
|------------|---------------------------|---------------------------------------|-----------------|
| `POST`     | `/auth/signup`            | Register new User         | Public          |
| `POST`     | `/auth/login`             | User login and authentication         | Public          |
| `POST`     | `/customers/register`     | Register a new customer               | Public          |
| `GET`      | `/customers/{customer_id}`| Retrieve customer details             | Authenticated   |
| `POST`     | `/orders`                 | Create a new sharpening order         | Authenticated   |
| `GET`      | `/orders/{order_id}/status`| Check order status                    | Authenticated   |
| `GET`      | `/pricing`                | Retrieve service pricing              | Public          |

---

## Notes:

- **Access Levels**:
  - **Public**: No authentication required.
  - **Authenticated**: Requires a valid authentication token.

- Use the base URL:

