import {api} from './api';

class BookingService {
    // ========================================
    // BOOKING MANAGEMENT OPERATIONS
    // ========================================

    async createBooking(bookingData) {
        try {
            return await api.createBooking(bookingData);
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    }

    async getBookingDetails(bookingId) {
        try {
            return await api.getBookingDetails(bookingId);
        } catch (error) {
            console.error('Error fetching booking details:', error);
            throw error;
        }
    }

    async searchBookings(searchParams) {
        try {
            return await api.searchBookings(searchParams);
        } catch (error) {
            console.error('Error searching bookings:', error);
            throw error;
        }
    }

    async cancelBooking(bookingId) {
        try {
            return await api.cancelBooking(bookingId);
        } catch (error) {
            console.error('Error cancelling booking:', error);
            throw error;
        }
    }

    async reconfirmBooking(bookingId) {
        try {
            return await api.reconfirmBooking(bookingId);
        } catch (error) {
            console.error('Error reconfirming booking:', error);
            throw error;
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    validateBookingData(bookingData) {
        const required = ['availabilityId', 'passengers', 'contactInfo'];
        const missing = required.filter(field => !bookingData[field]);

        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        // Validate passengers
        if (!Array.isArray(bookingData.passengers) || bookingData.passengers.length === 0) {
            throw new Error('At least one passenger is required');
        }

        // Validate each passenger
        bookingData.passengers.forEach((passenger, index) => {
            const passengerRequired = ['firstName', 'lastName', 'dateOfBirth'];
            const passengerMissing = passengerRequired.filter(field => !passenger[field]);

            if (passengerMissing.length > 0) {
                throw new Error(`Passenger ${index + 1} missing: ${passengerMissing.join(', ')}`);
            }
        });

        // Validate contact info
        if (!bookingData.contactInfo.email || !bookingData.contactInfo.phone) {
            throw new Error('Contact email and phone are required');
        }

        return true;
    }

    formatBookingData(bookingData) {
        return {
            ...bookingData,
            passengers: bookingData.passengers.map(passenger => ({
                ...passenger,
                firstName: passenger.firstName?.trim(),
                lastName: passenger.lastName?.trim(),
                nationality: passenger.nationality?.toUpperCase()
            })),
            contactInfo: {
                ...bookingData.contactInfo,
                email: bookingData.contactInfo.email?.toLowerCase().trim()
            }
        };
    }
}

// Create singleton instance
const bookingService = new BookingService();

export default bookingService;