import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const AgentProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getAgentProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Agent profile fetch failed:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="card">Loading...</div>;

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Agent Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Credit Limit: ${profile.creditLimit}</p>
    </div>
  );
};

export default AgentProfile;