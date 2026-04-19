import { Order, OrderItem, CreateOrderRequest, UpdateOrderRequest } from '../types/order';
import { v4 as uuidv4 } from 'uuid';

class OrderService {
  private orders: Map<string, Order> = new Map();
  private orderCounter: number = 1;

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    const sampleOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        customerName: 'John Smith',
        totalAmount: 1059.97,
        status: 'delivered',
        orderDate: '2024-01-15',
        items: [
          { id: uuidv4(), productName: 'Laptop', quantity: 1, price: 999.99 },
          { id: uuidv4(), productName: 'Mouse', quantity: 2, price: 29.99 }
        ]
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        customerName: 'Sarah Johnson',
        totalAmount: 149.99,
        status: 'shipped',
        orderDate: '2024-01-18',
        items: [
          { id: uuidv4(), productName: 'Keyboard', quantity: 1, price: 149.99 }
        ]
      },
      {
        id: '3',
        orderNumber: 'ORD-003',
        customerName: 'Michael Chen',
        totalAmount: 89.97,
        status: 'processing',
        orderDate: '2024-01-20',
        items: [
          { id: uuidv4(), productName: 'USB Hub', quantity: 3, price: 29.99 }
        ]
      },
      {
        id: '4',
        orderNumber: 'ORD-004',
        customerName: 'Emily Davis',
        totalAmount: 199.99,
        status: 'pending',
        orderDate: '2024-01-22',
        items: [
          { id: uuidv4(), productName: 'Monitor', quantity: 1, price: 199.99 }
        ]
      },
      {
        id: '5',
        orderNumber: 'ORD-005',
        customerName: 'Robert Wilson',
        totalAmount: 79.99,
        status: 'cancelled',
        orderDate: '2024-01-23',
        items: [
          { id: uuidv4(), productName: 'Webcam', quantity: 1, price: 79.99 }
        ]
      }
    ];

    sampleOrders.forEach(order => {
      this.orders.set(order.id, order);
      const num = parseInt(order.orderNumber.split('-')[1]);
      if (num >= this.orderCounter) {
        this.orderCounter = num + 1;
      }
    });
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.get(id);
  }

  createOrder(data: CreateOrderRequest): Order {
    const id = uuidv4();
    const orderNumber = `ORD-${String(this.orderCounter).padStart(3, '0')}`;
    this.orderCounter++;

    const items: OrderItem[] = data.items.map(item => ({
      ...item,
      id: uuidv4()
    }));

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order: Order = {
      id,
      orderNumber,
      customerName: data.customerName,
      totalAmount,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      items
    };

    this.orders.set(id, order);
    return order;
  }

  updateOrder(id: string, data: UpdateOrderRequest): Order | undefined {
    const order = this.orders.get(id);
    if (!order) return undefined;

    if (data.customerName !== undefined) {
      order.customerName = data.customerName;
    }

    if (data.status !== undefined) {
      order.status = data.status;
    }

    if (data.items !== undefined) {
      order.items = data.items.map(item => ({
        ...item,
        id: uuidv4()
      }));
      order.totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    this.orders.set(id, order);
    return order;
  }

  deleteOrder(id: string): boolean {
    return this.orders.delete(id);
  }

  getOrdersByStatus(status: Order['status']): Order[] {
    return Array.from(this.orders.values()).filter(order => order.status === status);
  }
}

export default new OrderService();
