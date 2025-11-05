import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await ordersAPI.getById(id);
      setOrder(response.data);
    } catch (error) {
      toast.error('Failed to load order');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Orders
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Order {order.orderNumber}
                  </h1>
                  <p className="text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Order Timeline */}
              <div className="flex items-center justify-between mt-8">
                <div
                  className={`flex flex-col items-center ${
                    order.status === 'pending' ||
                    order.status === 'processing' ||
                    order.status === 'shipped' ||
                    order.status === 'delivered'
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  }`}
                >
                  <FiPackage className="w-8 h-8 mb-2" />
                  <span className="text-xs font-medium">Processing</span>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div
                    className={`h-full ${
                      order.status === 'shipped' || order.status === 'delivered'
                        ? 'bg-primary-600'
                        : 'bg-gray-200'
                    }`}
                  ></div>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    order.status === 'shipped' || order.status === 'delivered'
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  }`}
                >
                  <FiTruck className="w-8 h-8 mb-2" />
                  <span className="text-xs font-medium">Shipped</span>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div
                    className={`h-full ${
                      order.status === 'delivered' ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  ></div>
                </div>
                <div
                  className={`flex flex-col items-center ${
                    order.status === 'delivered' ? 'text-primary-600' : 'text-gray-400'
                  }`}
                >
                  <FiCheckCircle className="w-8 h-8 mb-2" />
                  <span className="text-xs font-medium">Delivered</span>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                  </p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="text-gray-700">
                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>
                    {order.shippingCost === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `$${order.shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Payment Method</span>
                  <span className="capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Payment Status</span>
                  <span
                    className={`font-semibold ${
                      order.isPaid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {order.isPaid ? 'Paid' : 'Not Paid'}
                  </span>
                </div>
                {order.isPaid && order.paidAt && (
                  <div className="text-xs text-gray-600">
                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
