import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from '../components/Common/Loader';
import { Plus, Search, Plane, Wifi, Utensils, Film } from 'lucide-react';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  // Dummy data for demonstration
  const dummyFlights = [
    { id: 1, origin: 'JFK', destination: 'LAX', airline: 'FitsAir', flightNumber: 'FA101', price: 350, duration: '5h 30m', departure: '08:00 AM', arrival: '11:30 AM', class: 'Economy', seats: 42 },
    { id: 2, origin: 'SFO', destination: 'ORD', airline: 'SkyWings', flightNumber: 'SW202', price: 280, duration: '4h 15m', departure: '10:00 AM', arrival: '02:15 PM', class: 'Business', seats: 18 },
    { id: 3, origin: 'LAX', destination: 'MIA', airline: 'FitsAir', flightNumber: 'FA303', price: 420, duration: '5h 00m', departure: '01:00 PM', arrival: '06:00 PM', class: 'Economy', seats: 35 },
    { id: 4, origin: 'ORD', destination: 'SEA', airline: 'CloudJet', flightNumber: 'CJ404', price: 315, duration: '4h 30m', departure: '03:00 PM', arrival: '07:30 PM', class: 'First', seats: 8 },
    { id: 5, origin: 'MIA', destination: 'JFK', airline: 'FitsAir', flightNumber: 'FA505', price: 390, duration: '3h 15m', departure: '05:00 PM', arrival: '08:15 PM', class: 'Business', seats: 22 },
    { id: 6, origin: 'SEA', destination: 'LAX', airline: 'SkyWings', flightNumber: 'SW606', price: 245, duration: '2h 45m', departure: '07:00 PM', arrival: '09:45 PM', class: 'Economy', seats: 48 },
  ];

  useEffect(() => {
    // Simulate API call
    setFlights(dummyFlights);
  }, []);

  const filteredFlights = flights.filter(flight => {
    const matchesSearch = flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flight.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flight.airline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'all' || flight.class === filterClass;
    return matchesSearch && matchesClass;
  });

  if (loading) return <Loader />;

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Flights</h1>
          <p className="text-gray-600">Search and book your next flight</p>
        </div>
        <motion.button
          className="btn btn-primary flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          <span>Add Flight</span>
        </motion.button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="glass-card-light p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Flights</label>
            <input
              type="text"
              placeholder="Search by origin, destination, or airline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field-light"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="input-field-light"
            >
              <option value="all">All Classes</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="btn btn-primary w-full flex items-center justify-center gap-2 shadow-md">
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Flight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFlights.map((flight, index) => (
          <motion.div
            key={flight.id}
            className="glass-card-light overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="cursor-pointer"
          >
            {/* Flight Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{flight.airline}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-sm">
                  {flight.flightNumber}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{flight.origin}</div>
                  <div className="text-xs opacity-80">{flight.departure}</div>
                </div>
                <div className="flex flex-col items-center mx-4">
                  <div className="text-xs opacity-80 mb-1">{flight.duration}</div>
                  <div className="w-16 h-px bg-white relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Plane size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{flight.destination}</div>
                  <div className="text-xs opacity-80">{flight.arrival}</div>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {flight.class}
                  </span>
                  <span className="text-sm text-gray-600">
                    {flight.seats} seats available
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-3xl font-bold text-gray-900">${flight.price}</div>
                </div>
                <motion.button
                  className="btn btn-primary shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now →
                </motion.button>
              </div>

              {/* Features */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1"><Wifi size={14} /> Free WiFi</span>
                <span className="flex items-center gap-1"><Utensils size={14} /> Meals</span>
                <span className="flex items-center gap-1"><Film size={14} /> Entertainment</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFlights.length === 0 && (
        <motion.div
          className="glass-card-light p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Plane size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Flights Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Flights;