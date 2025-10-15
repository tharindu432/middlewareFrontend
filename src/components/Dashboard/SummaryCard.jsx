import React from 'react';

const SummaryCard = ({ title, value, change, icon, color, trend = 'up' }) => {
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    pink: 'bg-pink-600',
    cyan: 'bg-cyan-600',
  };

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors[color || 'blue']} rounded-lg flex items-center justify-center`}>
          {typeof icon === 'string' ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon && React.createElement(icon, { className: "text-white", size: 24, strokeWidth: 2 })
          )}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default SummaryCard;