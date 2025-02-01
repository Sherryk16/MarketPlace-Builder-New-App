'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { useRouter } from 'next/navigation';

interface OrderItem {
  _key: string;
  name: string;
  quantity: number;
  price: number;
  image: {
    asset: {
      url: string;
    };
  } | null;
  slug: string;
}

interface PaymentDetails {
  id: string;
  status: string;
  amount: number;
  currency: string;
}

interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: string;
}

interface Order {
  _id: string;
  user: {
    _ref: string;
    email: string;
  };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentStatus: string;
  paymentDetails: PaymentDetails;
  total: number;
  _createdAt: string;
  _updatedAt: string;
}

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loginPage, setLoginPage] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdmin');
    if (isAuthenticated === 'true') {
      setIsAdmin(true);
      setLoginPage(false);
    }
  }, []); // Empty dependency array to run only on initial mount

  useEffect(() => {
    if (!isAdmin) return;

    const fetchOrders = async () => {
      try {
        const data: Order[] = await client.fetch(`
          *[_type == "orders"]{
            _id,
            user->{
              email
            },
            items[]{
              _key,
              name,
              quantity,
              price,
              image {
                asset->{
                  url
                }
              },
              slug
            },
            shippingAddress,
            paymentStatus,
            paymentDetails,
            total,
            _createdAt,
            _updatedAt
          }
        `);
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = 'sherry258012@gmail.com';
    const adminPassword = 'Hekto123';

    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setLoginPage(false);
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleDelete = async (orderId: string) => {
    if (orderId) {
      try {
        await client.delete(orderId);
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        setModalOpen(false); // Close modal after deletion
      } catch (err) {
        setError('Failed to delete the order.');
      }
    }
  };

  const handleUpdate = async (orderId: string) => {
    // Redirect to an update page or show a modal to update order status
    router.push(`/admin/update/${orderId}`);
  };

  if (loginPage) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">Login</button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>You need to log in first.</p>
      </div>
    );
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-3 rounded-lg shadow-md mb-4 max-w-xl mx-auto sm:max-w-lg md:max-w-2xl">
            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
            <div className="mt-2">
              <p><strong>User Email:</strong> {order.user?.email}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              <p><strong>Total Price:</strong> ${order.total}</p>
              <p><strong>Created At:</strong> {new Date(order._createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(order._updatedAt).toLocaleDateString()}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-md font-medium">Items:</h4>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item._key} className="flex items-center space-x-4">
                    <img
                      src={item.image ? urlFor(item.image).width(80).url() : '/placeholder.png'}
                      alt={item.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      <p>{item.name} (x{item.quantity})</p>
                      <p>${item.price * item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-md font-medium">Shipping Address:</h4>
              <p>{order.shippingAddress?.name}</p>
              <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
              <p>{order.shippingAddress?.phone}</p>
              <p>{order.shippingAddress?.email}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-md font-medium">Payment Details:</h4>
              <p><strong>Payment ID:</strong> {order.paymentDetails?.id}</p>
              <p><strong>Status:</strong> {order.paymentDetails?.status}</p>
              <p><strong>Amount Paid:</strong> ${order.paymentDetails?.amount}</p>
              <p><strong>Currency:</strong> {order.paymentDetails?.currency}</p>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
                onClick={() => handleUpdate(order._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
                onClick={() => {
                  setModalOpen(true);
                  setOrderToDelete(order._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this order?</h3>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(orderToDelete!)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
