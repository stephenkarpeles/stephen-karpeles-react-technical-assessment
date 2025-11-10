import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      if (response.data.success) {
        setOrders(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <div className="card p-6 text-center">
          <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              {user.firstName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Profile Information */}
        <div className="md:col-span-2 card p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="input-field bg-gray-50 dark:bg-gray-700">
                {user.firstName} {user.lastName}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="input-field bg-gray-50 dark:bg-gray-700">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <div className="input-field bg-gray-50 dark:bg-gray-700 capitalize">
                {user.role}
              </div>
            </div>

            {user.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="input-field bg-gray-50 dark:bg-gray-700">
                  {user.phone}
                </div>
              </div>
            )}

            {user.address && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <div className="input-field bg-gray-50 dark:bg-gray-700">
                  {user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6 text-center">
          <svg
            className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {loading ? '...' : totalOrders}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Total Orders
          </div>
        </div>

        <div className="card p-6 text-center">
          <svg
            className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {loading ? '...' : `$${totalSpent.toFixed(2)}`}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Total Spent
          </div>
        </div>

        <div className="card p-6 text-center">
          <svg
            className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            0
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Reviews Written
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

