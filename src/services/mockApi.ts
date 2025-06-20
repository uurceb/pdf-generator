import { Customer, Product, Order, SalesReport } from '../types';

// Mock data generators
const generateCustomers = (): Customer[] => {
  const customers: Customer[] = [];
  const companies = ['Tech Corp', 'Digital Solutions', 'Innovation Labs', 'Creative Studio', 'Smart Systems', 'Future Dynamics', 'Alpha Industries', 'Beta Enterprises'];
  const states = ['CA', 'NY', 'TX', 'FL', 'WA', 'IL', 'PA', 'OH'];
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];

  for (let i = 1; i <= 50; i++) {
    customers.push({
      id: i,
      name: `Customer ${i}`,
      email: `customer${i}@example.com`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      company: companies[Math.floor(Math.random() * companies.length)],
      address: {
        street: `${Math.floor(Math.random() * 999) + 1} Main St`,
        city: `City ${i}`,
        state: states[Math.floor(Math.random() * states.length)],
        zipCode: String(Math.floor(Math.random() * 90000) + 10000),
        country: 'USA'
      },
      totalOrders: Math.floor(Math.random() * 20) + 1,
      totalSpent: Math.floor(Math.random() * 10000) + 500,
      lastOrder: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return customers;
};

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = ['Electronics', 'Software', 'Hardware', 'Services', 'Consulting'];
  const productNames = ['Pro Suite', 'Advanced Kit', 'Premium Package', 'Standard Plan', 'Enterprise Solution'];

  for (let i = 1; i <= 30; i++) {
    products.push({
      id: i,
      name: `${productNames[Math.floor(Math.random() * productNames.length)]} ${i}`,
      description: `High-quality product with advanced features and excellent performance.`,
      price: Math.floor(Math.random() * 500) + 50,
      category: categories[Math.floor(Math.random() * categories.length)],
      stock: Math.floor(Math.random() * 100) + 10,
      sku: `SKU-${String(i).padStart(4, '0')}`
    });
  }
  
  return products;
};

const generateOrders = (customers: Customer[], products: Product[]): Order[] => {
  const orders: Order[] = [];
  const statuses: ('pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  for (let i = 1; i <= 100; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const orderDate = new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000);
    const dueDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let subtotal = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const itemTotal = product.price * quantity;
      
      items.push({
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.price,
        total: itemTotal
      });
      
      subtotal += itemTotal;
    }

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    orders.push({
      id: i,
      customerId: customer.id,
      customerName: customer.name,
      orderDate: orderDate.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      items,
      subtotal,
      tax,
      total,
      shippingAddress: customer.address,
      billingAddress: customer.address
    });
  }
  
  return orders;
};

const generateSalesReport = (orders: Order[]): SalesReport => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalRevenue / totalOrders;

  const productRevenue = new Map<string, { revenue: number; quantity: number }>();
  orders.forEach(order => {
    order.items.forEach(item => {
      const existing = productRevenue.get(item.productName) || { revenue: 0, quantity: 0 };
      productRevenue.set(item.productName, {
        revenue: existing.revenue + item.total,
        quantity: existing.quantity + item.quantity
      });
    });
  });

  const topProducts = Array.from(productRevenue.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const monthlyData = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  for (const month of months) {
    monthlyData.push({
      month,
      revenue: Math.floor(Math.random() * 50000) + 20000,
      orders: Math.floor(Math.random() * 100) + 50
    });
  }

  return {
    period: 'Q1 2024',
    totalRevenue,
    totalOrders,
    averageOrderValue,
    topProducts,
    monthlyData
  };
};

// Initialize mock data
const customers = generateCustomers();
const products = generateProducts();
const orders = generateOrders(customers, products);
const salesReport = generateSalesReport(orders);

// Mock API functions
export const mockApi = {
  getCustomers: async (): Promise<Customer[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return customers;
  },

  getProducts: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return products;
  },

  getOrders: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return orders;
  },

  getOrder: async (id: number): Promise<Order | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return orders.find(order => order.id === id) || null;
  },

  getSalesReport: async (): Promise<SalesReport> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return salesReport;
  }
};