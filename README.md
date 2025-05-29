# TrackIt - Real-Time Delivery Tracking App

**TrackIt** is a full-stack real-time delivery tracking application designed to streamline order management and delivery tracking for vendors, delivery personnel, and customers. The app assigns orders to vendors, allows vendors to assign delivery partners, and enables customers to track their deliveries live on a map.

---

## 1. Architecture

- **Frontend:** Next.js (React) with client-side routing, hooks, and Axios for API calls.  
- **Backend:** Node.js with Express for REST API, managing authentication, orders, and real-time updates.  
- **Database:** MongoDB for storing users, orders, and delivery statuses.  
- **Real-time:** WebSocket (Socket.IO) for live location updates and order status synchronization.  
- **Authentication:** JWT tokens stored in `localStorage` for session management.  
- **Map Integration:** Google Maps API or similar for displaying live tracking on the customer side.

---

## 2. Setup Instructions

### Prerequisites

- Node.js and npm installed  
- MongoDB running locally or remotely  
- leaflet (for live tracking map)

---

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/trackit.git
   cd trackit/backend
    ```
