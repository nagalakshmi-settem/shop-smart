import useOrders from './useOrders';

export default function MyOrders() {
  const { orders, stats, loading, error } = useOrders();

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-500 animate-pulse">Loading orders...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-red-500">{error}</div>
    </div>
  );

  if (orders.length === 0) return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <div className="text-6xl">📦</div>
      <h2 className="text-xl font-medium text-gray-700">No orders yet</h2>
      <p className="text-gray-400 text-sm">Start shopping to see your orders here</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 px-2">My Orders</h1>

        {/* Stats Card */}
        {stats && (
          <div className="bg-white rounded-lg p-4 mb-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2874f0]">
                {stats.totalOrders}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total Orders</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl font-bold text-green-600">
                ₹{stats.totalSpent?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#ff9f00]">
                ₹{Math.round(stats.avgOrderValue)?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Avg Order Value</p>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg p-4 shadow-sm">

              {/* Order Header */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-medium text-gray-700">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm text-gray-600">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })
                      : 'N/A'
                    }
                  </p>
                </div>
                <div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full
                    ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <hr className="mb-3" />

              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.product?.image || '📦'}</span>
                      <div>
                        <p className="text-sm text-gray-700 font-medium">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="mt-3 mb-2" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Amount</span>
                <span className="text-base font-semibold text-gray-900">
                  ₹{order.totalAmount.toLocaleString()}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}