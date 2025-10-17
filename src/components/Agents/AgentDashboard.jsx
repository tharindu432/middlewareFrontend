// This component can be built out to show agent-specific stats.
// For now, it serves as a placeholder for the agent's landing page.
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Users, BarChart, CreditCard } from 'lucide-react';
import Loader from '../Common/Loader';

const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="card p-6 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="text-white" size={24} />
        </div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);


const AgentDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.getAgentStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load agent stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={Users} title="My Team Size" value={stats?.employeeCount || 0} color="bg-blue-500" />
            <StatCard icon={BarChart} title="My Transactions" value={stats?.transactionCount || 0} color="bg-teal-500" />
            <StatCard icon={CreditCard} title="Current Credit" value={`$${(stats?.currentCredit || 0).toLocaleString()}`} color="bg-purple-500" />
        </div>
    );
};

export default AgentDashboard;
