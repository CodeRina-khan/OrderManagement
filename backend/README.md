# Order Management Backend API

Node.js/Express backend for the Order Management System.

## Features

- RESTful API for managing orders
- In-memory data storage with sample data
- CORS support for frontend integration
- TypeScript for type safety
- Express middleware for request handling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration (optional):
```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
```

## Development

Run the development server with hot reload:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Build

Build TypeScript to JavaScript:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## API Endpoints

### Get All Orders
```
GET /api/orders
```

Response:
```json
[
  {
    "id": "uuid",
    "orderNumber": "ORD-001",
    "customerName": "John Smith",
    "totalAmount": 1059.97,
    "status": "delivered",
    "orderDate": "2024-01-15",
    "items": [
      {
        "id": "uuid",
        "productName": "Laptop",
        "quantity": 1,
        "price": 999.99
      }
    ]
  }
]
```

### Get Order by ID
```
GET /api/orders/:id
```

### Get Orders by Status
```
GET /api/orders/status/:status
```

Valid statuses: `pending`, `processing`, `shipped`, `delivered`, `cancelled`

### Create Order
```
POST /api/orders
Content-Type: application/json

{
  "customerName": "Jane Doe",
  "items": [
    {
      "productName": "Keyboard",
      "quantity": 1,
      "price": 149.99
    }
  ]
}
```

### Update Order
```
PUT /api/orders/:id
Content-Type: application/json

{
  "customerName": "Jane Doe",
  "status": "shipped",
  "items": [
    {
      "productName": "Keyboard",
      "quantity": 1,
      "price": 149.99
    }
  ]
}
```

### Delete Order
```
DELETE /api/orders/:id
```

## Sample Data

The backend comes with 5 sample orders pre-loaded:
- ORD-001: Delivered (John Smith)
- ORD-002: Shipped (Sarah Johnson)
- ORD-003: Processing (Michael Chen)
- ORD-004: Pending (Emily Davis)
- ORD-005: Cancelled (Robert Wilson)

## Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **CORS** - Cross-Origin Resource Sharing
- **UUID** - Unique ID generation
