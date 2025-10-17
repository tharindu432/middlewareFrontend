import {api} from './api';

class CreditService {
    // ========================================
    // CREDIT MANAGEMENT OPERATIONS
    // ========================================

    async getCreditBalance() {
        try {
            return await api.getCreditBalance();
        } catch (error) {
            console.error('Error fetching credit balance:', error);
            throw error;
        }
    }

    async getCreditTransactions() {
        try {
            return await api.getCreditTransactions();
        } catch (error) {
            console.error('Error fetching credit transactions:', error);
            throw error;
        }
    }

    async requestCreditTopup(topupData) {
        try {
            return await api.requestCreditTopup(topupData);
        } catch (error) {
            console.error('Error requesting credit top-up:', error);
            throw error;
        }
    }

    async getTopupHistory() {
        try {
            return await api.getTopupHistory();
        } catch (error) {
            console.error('Error fetching top-up history:', error);
            throw error;
        }
    }

    // ========================================
    // ADMIN OPERATIONS
    // ========================================

    async approveCreditTopup(topupId) {
        try {
            return await api.approveCreditTopup(topupId);
        } catch (error) {
            console.error('Error approving credit top-up:', error);
            throw error;
        }
    }

    async rejectCreditTopup(topupId) {
        try {
            return await api.rejectCreditTopup(topupId);
        } catch (error) {
            console.error('Error rejecting credit top-up:', error);
            throw error;
        }
    }
}

// Create singleton instance
const creditService = new CreditService();

export default creditService;