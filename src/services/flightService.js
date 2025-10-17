import {api} from './api';

class FlightService {
    // ========================================
    // FLIGHT SEARCH OPERATIONS
    // ========================================

    async searchFlights(searchParams) {
        try {
            return await api.searchFlights(searchParams);
        } catch (error) {
            console.error('Error searching flights:', error);
            throw error;
        }
    }

    async getFlightDetails(availabilityId) {
        try {
            return await api.getFlightDetails(availabilityId);
        } catch (error) {
            console.error('Error fetching flight details:', error);
            throw error;
        }
    }

    async getFareRules(fareId) {
        try {
            return await api.getFareRules(fareId);
        } catch (error) {
            console.error('Error fetching fare rules:', error);
            throw error;
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    validateSearchParams(params) {
        const required = ['origin', 'destination', 'departureDate', 'adults'];
        const missing = required.filter(field => !params[field]);

        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        // Validate date format
        if (params.departureDate && !this.isValidDate(params.departureDate)) {
            throw new Error('Invalid departure date format. Use YYYY-MM-DD');
        }

        if (params.returnDate && !this.isValidDate(params.returnDate)) {
            throw new Error('Invalid return date format. Use YYYY-MM-DD');
        }

        return true;
    }

    isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) return false;

        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    formatSearchParams(params) {
        return {
            origin: params.origin?.toUpperCase(),
            destination: params.destination?.toUpperCase(),
            departureDate: params.departureDate,
            returnDate: params.returnDate || undefined,
            adults: parseInt(params.adults) || 1,
            children: parseInt(params.children) || 0,
            infants: parseInt(params.infants) || 0,
            cabinClass: params.cabinClass || 'ECONOMY',
            tripType: params.tripType || 'ONE_WAY'
        };
    }
}

// Create singleton instance
const flightService = new FlightService();

export default flightService;