export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  customerName: string;
  items: Omit<OrderItem, 'id'>[];
}

export interface UpdateOrderRequest {
  customerName?: string;
  status?: Order['status'];
  items?: Omit<OrderItem, 'id'>[];
}
