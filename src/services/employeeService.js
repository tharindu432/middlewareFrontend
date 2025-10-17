import {api} from './api';

class EmployeeService {
    // ========================================
    // EMPLOYEE MANAGEMENT OPERATIONS
    // ========================================

    async getAllEmployees() {
        try {
            return await api.getAllEmployees();
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    }

    async createEmployee(employeeData) {
        try {
            return await api.createEmployee(employeeData);
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    }

    async updateEmployee(employeeId, employeeData) {
        try {
            return await api.updateEmployee(employeeId, employeeData);
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    }

    async deleteEmployee(employeeId) {
        try {
            return await api.deleteEmployee(employeeId);
        } catch (error) {
            console.error('Error deleting employee:', error);
            throw error;
        }
    }

    async deactivateEmployee(employeeId) {
        try {
            return await api.deactivateEmployee(employeeId);
        } catch (error) {
            console.error('Error deactivating employee:', error);
            throw error;
        }
    }

    async resetPassword(employeeId, passwordData) {
        try {
            return await api.resetEmployeePassword(employeeId, passwordData);
        } catch (error) {
            console.error('Error resetting employee password:', error);
            throw error;
        }
    }
}

// Create singleton instance
const employeeService = new EmployeeService();

export default employeeService;