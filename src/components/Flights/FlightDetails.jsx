import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import Loader from '../Common/Loader';

const FlightDetails = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [fareRules, setFareRules] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const flightResponse = await api.getFlightDetails(id);
        const rulesResponse = await api.getFareRules(id);
        setFlight(flightResponse.data);
        setFareRules(rulesResponse.data);
      } catch (error) {
        console.error('Flight details fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <motion.div
      className="ml-64 p-6 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {flight && (
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-4">Flight Details</h2>
          <p className="text-gray-300">Origin: {flight.origin}</p>
          <p className="text-gray-300">Destination: {flight.destination}</p>
          <p className="text-gold-500 font-semibold">Price: ${flight.price}</p>
          <h3 className="text-lg font-semibold text-white mt-4">Fare Rules</h3>
          {fareRules && <p className="text-gray-400">{fareRules.rules}</p>}
        </div>
      )}
    </motion.div>
  );
};

export default FlightDetails;