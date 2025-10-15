import { motion } from 'framer-motion';
import SummaryCard from './SummaryCard';
import RecentBookings from './RecentBookings';
import { TrendingUp, Users, Plane, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const role = localStorage.getItem('role') || 'ADMIN';
  const dummyData = {
    recentBookings: [
      { id: 'BK12346', customer: 'Bob Williams', route: 'SFO - ORD', date: '2024-08-06', amount: 280, status: 'Pending' },
      { id: 'BK12345', customer: 'Alice Johnson', route: 'JFK - LAX', date: '2024-08-05', amount: 350, status: 'Confirmed' },
      { id: 'BK12344', customer: 'Charlie Brown', route: 'LAX - MIA', date: '2024-08-04', amount: 420, status: 'Confirmed' },
      { id: 'BK12343', customer: 'Diana Prince', route: 'ORD - SEA', date: '2024-08-03', amount: 315, status: 'Confirmed' },
    ],
  };

  return (
    <div className="page-container">
      {/* Stats cards - role specific */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {(role === 'ADMIN'
          ? [
              { title: 'Active Agents', value: '42', change: '+3.1%', icon: Users, color: 'green', trend: 'up' },
              { title: 'Pending Approvals', value: '8', change: '+1', icon: CreditCard, color: 'orange', trend: 'up' },
              { title: 'Flights This Week', value: '42', change: '+8.5%', icon: Plane, color: 'purple', trend: 'up' },
              { title: 'Total Sales', value: '$350', change: '+5.2%', icon: TrendingUp, color: 'blue', trend: 'up' },
            ]
          : [
              { title: 'Total Sales', value: '$350', change: '+5.2%', icon: TrendingUp, color: 'blue', trend: 'up' },
              { title: 'My Bookings', value: '12', change: '+12%', icon: Users, color: 'green', trend: 'up' },
              { title: 'Flights This Week', value: '42', change: '+8.5%', icon: Plane, color: 'purple', trend: 'up' },
              { title: 'Available Credit', value: '$50K', change: '-2.3%', icon: CreditCard, color: 'orange', trend: 'down' },
            ]
        ).map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            icon={card.icon}
            color={card.color}
            trend={card.trend}
          />
        ))}
      </div>

      {/* Charts and additional info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Quick stats */}
        <div className="card p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            {(role === 'ADMIN'
              ? [
                  { label: 'Pending Approvals', value: '8' },
                  { label: 'New Agents', value: '3' },
                  { label: 'System Events', value: '12' },
                  { label: 'Open Support Tickets', value: '2' },
                ]
              : [
                  { label: 'Pending Bookings', value: '8' },
                  { label: "Today's Revenue", value: '$1,240' },
                  { label: 'New Tickets', value: '3' },
                  { label: 'Credit Used', value: '$740' },
                ]
            ).map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className="text-base font-semibold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue chart */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-48 flex items-end justify-around gap-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t relative hover:from-blue-700 hover:to-blue-600 transition-all duration-200 cursor-pointer shadow-sm"
                style={{ height: `${height}%` }}
              >
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-4 text-xs text-gray-600">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <RecentBookings bookings={dummyData.recentBookings} />
    </div>
  );
};

export default Dashboard;