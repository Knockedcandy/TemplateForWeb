# TemplateWebsite

TemplateWebsite is a modern web application designed to simulate an online store experience. It includes essential e-commerce functionalities such as browsing products, adding items to a cart, and proceeding to checkout.
- RESTful API Endpoints:
  - `/api/products`: Handles product-related operations.
  - `/api/cart`: Manages cart functionalities.
- Home Route: 

### Frontend (`App.js`)
- React Application: Provides an intuitive user interface.
- Product Grid: Displays a list of products with images, names, prices, and an option to add to the cart.
- Cart Overlay: Allows users to manage their cart with options to increment, decrement, or remove items.
- Checkout Page: Simulates a credit card payment interface for completing orders.
- Routing: Utilizes React Router for navigation between the homepage and checkout page.


### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- A configured `.env` file for environment variables (e.g., `PORT` and database credentials)


### Install Dependencies
Backend : cd server
npm install

Frontend: cd frontend
npm install

### Start Up
Backend: node server.js

Frontend: cd frontend
npm start
