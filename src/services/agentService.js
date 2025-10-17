import {api} from './api';

class AgentService {
    // ========================================
    // ADMIN OPERATIONS (Admin manages agents)
    // ========================================

    async getAllAgents() {
        try {
            return await api.getAllAgents();
        } catch (error) {
            console.error('Error fetching agents:', error);
            throw error;
        }
    }

    async createAgent(agentData) {
        try {
            return await api.createAgent(agentData);
        } catch (error) {
            console.error('Error creating agent:', error);
            throw error;
        }
    }

    async updateAgent(agentId, agentData) {
        try {
            return await api.updateAgentAdmin(agentId, agentData);
        } catch (error) {
            console.error('Error updating agent:', error);
            throw error;
        }
    }

    async deleteAgent(agentId) {
        try {
            return await api.deleteAgent(agentId);
        } catch (error) {
            console.error('Error deleting agent:', error);
            throw error;
        }
    }

    // ========================================
    // AGENT SELF-SERVICE OPERATIONS
    // ========================================

    async getProfile() {
        try {
            return await api.getProfile();
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }

    async updateProfile(profileData) {
        try {
            return await api.updateProfile(profileData);
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    async getStatistics() {
        try {
            return await api.getStatistics();
        } catch (error) {
            console.error('Error fetching statistics:', error);
            throw error;
        }
    }
}

// Create singleton instance
const agentService = new AgentService();

export default agentService;