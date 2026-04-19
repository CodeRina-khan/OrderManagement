import { Router, Request, Response } from 'express';
import orderService from '../services/orderService';
import { CreateOrderRequest, UpdateOrderRequest } from '../types/order';

const router = Router();

// GET all orders
router.get('/', (req: Request, res: Response) => {
  try {
    const orders = orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// GET orders by status
router.get('/status/:status', (req: Request, res: Response) => {
  try {
    const status = req.params.status as any;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const orders = orderService.getOrdersByStatus(status);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders by status' });
  }
});

// GET single order by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const order = orderService.getOrderById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
});

// POST create new order
router.post('/', (req: Request, res: Response) => {
  try {
    const { customerName, items } = req.body as CreateOrderRequest;

    if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    for (const item of items) {
      if (!item.productName || !item.quantity || !item.price) {
        return res.status(400).json({ error: 'Invalid item data' });
      }
    }

    const order = orderService.createOrder({ customerName, items });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// PUT update order
router.put('/:id', (req: Request, res: Response) => {
  try {
    const order = orderService.updateOrder(req.params.id, req.body as UpdateOrderRequest);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// DELETE order
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = orderService.deleteOrder(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

export default router;
