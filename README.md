# Bike Store Express Application

## Overview

This is an Express-based application built with TypeScript, designed to manage a Bike Store. The app uses MongoDB with Mongoose to handle bike products and customer orders. It supports full CRUD operations for managing bike products and processing orders. Additionally, it provides functionality to calculate total revenue from all orders.

### liveLink 

<a href="https://bike-store-server-ebon.vercel.app">Bike Store </a>

## Features

- **CRUD Operations for Bikes**: Create, Read, Update, and Delete bike products.
- **Order Management**: Allows customers to order bikes
- **Revenue Calculation**: Aggregates revenue data from orders to provide the total earnings.
- **Inventory Management**: Automatically updates stock and marks products as out of stock when necessary.
- **Error Handling**: Proper error messages for validation errors and stock issues.

## Project Setup

### Requirements

- Node.js
- MongoDB
- TypeScript
- Express.js

### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/abubakar1010/bike_store_server.git
   ```
3. Navigate to the project folder:
   
   ```bash
   cd bike_store_server
   ```
5. Install the dependencies:
   
   ```bash
   npm i
   ```
7. Set up your MongoDB database
8. Create a .env file to store your MongoDB URI and other configurations.Use the example.env file as a reference
9. Run the application
    
    ```bash
    npm run dev
    ```
    
    
 ## API Endpoints
 
### 1. Products (Bikes)

- **Create Bike:** POST /api/products
- **Get All Bike:** GET /api/products?searchField=value. searchField can be name, brand, or category.
- **Get Specific Bike:** GET /api/products/:id
- **Update Bike:** PUT /api/products/:id
- **Delete Bike:** DELETE /api/products/:id
### 2. Orders
- **Create Order:** POST /api/orders
- **Get Total Revenue:** GET /api/orders/revenue
