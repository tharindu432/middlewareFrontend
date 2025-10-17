import {api} from './api';

class TicketService {
    // ========================================
    // TICKET MANAGEMENT OPERATIONS
    // ========================================

    async issueTickets(ticketData) {
        try {
            return await api.issueTickets(ticketData);
        } catch (error) {
            console.error('Error issuing tickets:', error);
            throw error;
        }
    }

    async getTicketDetails(ticketId) {
        try {
            return await api.getTicketDetails(ticketId);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            throw error;
        }
    }

    async searchTickets(searchParams) {
        try {
            return await api.searchTickets(searchParams);
        } catch (error) {
            console.error('Error searching tickets:', error);
            throw error;
        }
    }

    async voidTicket(ticketId) {
        try {
            return await api.voidTicket(ticketId);
        } catch (error) {
            console.error('Error voiding ticket:', error);
            throw error;
        }
    }

    async refundTicket(ticketId) {
        try {
            return await api.refundTicket(ticketId);
        } catch (error) {
            console.error('Error refunding ticket:', error);
            throw error;
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    validateTicketData(ticketData) {
        const required = ['bookingId', 'paymentMethod'];
        const missing = required.filter(field => !ticketData[field]);

        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        const validPaymentMethods = ['CREDIT_CARD', 'BANK_TRANSFER', 'CREDIT_BALANCE'];
        if (!validPaymentMethods.includes(ticketData.paymentMethod)) {
            throw new Error(`Invalid payment method. Must be one of: ${validPaymentMethods.join(', ')}`);
        }

        return true;
    }

    getTicketStatusColor(status) {
        const statusColors = {
            'ISSUED': 'green',
            'VOIDED': 'red',
            'REFUNDED': 'orange',
            'PENDING': 'yellow',
            'CONFIRMED': 'blue'
        };
        return statusColors[status] || 'gray';
    }

    formatTicketNumber(ticketNumber) {
        if (!ticketNumber) return '';
        // Format ticket number as XXX-XXXXXXX
        return ticketNumber.replace(/(\d{3})(\d{7})/, '$1-$2');
    }
}

// Create singleton instance
const ticketService = new TicketService();

export default ticketService;