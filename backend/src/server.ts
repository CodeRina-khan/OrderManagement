import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
}));

// Routes
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Order Management API is running' });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Order Management API',
    version: '1.0.0',
    endpoints: {
      orders: '/api/orders',
      health: '/health'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Order Management API running on http://localhost:${PORT}`);
  console.log(`✓ CORS enabled for: ${CORS_ORIGIN}`);
  console.log(`✓ API endpoints:`);
  console.log(`  - GET    /api/orders              - Get all orders`);
  console.log(`  - GET    /api/orders/:id          - Get order by ID`);
  console.log(`  - GET    /api/orders/status/:status - Get orders by status`);
  console.log(`  - POST   /api/orders              - Create new order`);
  console.log(`  - PUT    /api/orders/:id          - Update order`);
  console.log(`  - DELETE /api/orders/:id          - Delete order`);
});
