# Order Management System - Complete Setup

This repository contains both the Angular frontend and Node.js backend for the Order Management System.

## Project Structure

```
OrderManagement/
├── order-management/           # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/         # Order interfaces
│   │   │   ├── services/       # Order service
│   │   │   ├── pages/          # Components
│   │   │   └── ...
│   │   └── ...
│   ├── package.json
│   └── angular.json
│
└── backend/                    # Node.js Backend
    ├── src/
    │   ├── types/              # TypeScript types
    │   ├── services/           # Business logic
    │   ├── routes/             # API routes
    │   └── server.ts           # Main server file
    ├── package.json
    └── tsconfig.json
```

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Angular CLI (for frontend development)

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The API will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd order-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

The frontend will run on `http://localhost:4200`

## API Documentation

The backend provides a RESTful API with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get specific order |
| GET | `/api/orders/status/:status` | Get orders by status |
| POST | `/api/orders` | Create new order |
| PUT | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |

For detailed API documentation, see [backend/README.md](backend/README.md)

## Connecting Frontend to Backend

The frontend is currently configured to use mock data from the OrderService. To connect it to the backend API, update the OrderService in `order-management/src/app/services/order.service.ts`:

```typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

// Replace the static testOrders with API calls
getOrders() {
  return this.http.get<Order[]>('http://localhost:3000/api/orders');
}
```

Add `HttpClientModule` to your app config:
```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    ...
  ]
};
```

## Features

### Frontend
- Display list of orders in a professional table
- Order status with color-coded badges
- Formatted currency and dates
- Responsive design

### Backend
- RESTful API with CRUD operations
- In-memory data storage with sample data
- CORS support for frontend integration
- TypeScript for type safety
- Validation and error handling

## Sample Data

Both frontend and backend come with pre-loaded sample orders:
- ORD-001: John Smith - Laptop + Mouse (Delivered)
- ORD-002: Sarah Johnson - Keyboard (Shipped)
- ORD-003: Michael Chen - USB Hub (Processing)
- ORD-004: Emily Davis - Monitor (Pending)
- ORD-005: Robert Wilson - Webcam (Cancelled)

## Development

### Frontend Development
```bash
cd order-management
npm run dev  # or ng serve
```

### Backend Development
```bash
cd backend
npm run dev  # Runs with ts-node for hot reload
```

### Build for Production

Frontend:
```bash
cd order-management
npm run build
```

Backend:
```bash
cd backend
npm run build
npm start
```

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
```

## Technologies Used

### Frontend
- Angular 19+
- TypeScript
- SCSS
- RxJS/Signals

### Backend
- Node.js
- Express.js
- TypeScript
- CORS middleware

## License

ISC
