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
   git clone https://github.com/pavan29903/TrackIt.git
   cd trackit/server
    ```
2. Install dependencies:

    ```bash
    npm install express mongoose bcryptjs jsonwebtoken cors dotenv socket.io typescript @react-google-maps/api

    npm install -D @types/express @types/mongoose @types/bcryptjs @types/jsonwebtoken @types/cors @types/node
    ```
3. Start the backend server:

    ```bash
    npm run dev
    ```
### frontend Setup

1. Open a new terminal and navigate to the frontend folder:

    ```bash 
    cd ../client
    ```
2. Install dependencies:

    ```bash
    npm install next react react-dom typescript leaflet socket.io-client typescript
    npm install -D @types/react @types/react-dom @types/node

    ```
3. Run the frontend:

    ```bash
    npm run dev
    ```
## 3. Features

### Vendor

- Register and login with vendor role. 
- Automatically assigned dummy orders on login.
- View list of assigned orders. 
- Assign orders to delivery partners.

### Delivery Personnel

- Login with delivery role
- View assigned orders.
- Update order status (Pending, Delivered).
- Share live location during delivery.

### Customer

- Track order status using order ID.
- View live location of delivery partner on the map.
- Receive real-time updates on delivery progress.

