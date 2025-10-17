import {api} from './api';

class AdminService {
    // ========================================
    // ADMIN DASHBOARD OPERATIONS
    // ========================================

    async getDashboardStatistics() {
        try {
            return await api.getDashboardStatistics();
        } catch (error) {
            console.error('Error fetching dashboard statistics:', error);
            throw error;
        }
    }

    async getSyncLogs() {
        try {
            return await api.getSyncLogs();
        } catch (error) {
            console.error('Error fetching sync logs:', error);
            throw error;
        }
    }

    async triggerSync() {
        try {
            return await api.triggerSync();
        } catch (error) {
            console.error('Error triggering sync:', error);
            throw error;
        }
    }

    async getAuditLogs() {
        try {
            return await api.getAuditLogs();
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            throw error;
        }
    }

    async updateSystemSetting(key, value) {
        try {
            return await api.updateSystemSetting(key, {value});
        } catch (error) {
            console.error('Error updating system setting:', error);
            throw error;
        }
    }

    // ========================================
    // CREDIT TOP-UP APPROVAL OPERATIONS
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

    // ========================================
    // HELPER METHODS
    // ========================================

    formatLogEntry(logEntry) {
        return {
            ...logEntry,
            timestamp: new Date(logEntry.timestamp).toLocaleString(),
            action: logEntry.action?.toUpperCase(),
            level: logEntry.level?.toUpperCase()
        };
    }

    getLogLevelColor(level) {
        const levelColors = {
            'ERROR': 'red',
            'WARN': 'orange',
            'INFO': 'blue',
            'DEBUG': 'gray',
            'SUCCESS': 'green'
        };
        return levelColors[level?.toUpperCase()] || 'gray';
    }

    formatStatistic(value, type = 'number') {
        if (type === 'currency') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(value);
        }

        if (type === 'percentage') {
            return `${value.toFixed(1)}%`;
        }

        return new Intl.NumberFormat('en-US').format(value);
    }
}

// Create singleton instance
const adminService = new AdminService();

export default adminService;