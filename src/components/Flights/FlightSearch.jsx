import { useState } from 'react';
import { api } from '../../services/api';
import { motion } from 'framer-motion';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({ origin: '', destination: '', date: '' });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.searchFlights(searchParams);
      setFlights(response.data);
    } catch (error) {
      console.error('Flight search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="card ml-64 p-6 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Flight Search</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Origin"
          value={searchParams.origin}
          onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Destination"
          value={searchParams.destination}
          onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={searchParams.date}
          onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          type="submit"
          className="btn btn-primary w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </motion.button>
      </form>
      <div className="mt-6 space-y-4">
        {flights.map((flight) => (
          <motion.div
            key={flight.id}
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>{flight.origin} to {flight.destination}</p>
            <p className="text-gold-500 font-semibold">${flight.price}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FlightSearch;