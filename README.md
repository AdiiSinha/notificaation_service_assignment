# Notification Service

A Node.js microservice that consumes messages from RabbitMQ and sends notifications via Email, SMS, and In-App channels. It supports retrying failed notifications with a configurable maximum retry count, and persists notification statuses in MongoDB.

---

## Features

- Consumes notification messages from RabbitMQ queue
- Sends notifications via Email, SMS, and In-App
- Tracks notification status and retries in MongoDB
- Retries failed notifications up to a configurable max limit
- REST API endpoint to enqueue test notifications

---

## Assumptions

- RabbitMQ is used as the message broker.
- MongoDB is used for persisting notification statuses and retry info.
- Environment variables or default localhost addresses are used for MongoDB and RabbitMQ.
- Email, SMS, and In-App services are mocked or implemented as async functions.

---

## Prerequisites

- Node.js (v18+ recommended)
- RabbitMQ instance running locally or accessible remotely
- MongoDB instance running locally or accessible remotely
- Postman or similar tool for API testing

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notification-service
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   Create a `.env` file in the root directory or set environment variables in your shell:

   ```env
   MONGODB_URI=mongodb://localhost:27017/notifications
   RABBITMQ_URI=amqp://localhost
   PORT=3000
   ```

4. **Start MongoDB and RabbitMQ**

   Make sure your MongoDB and RabbitMQ servers are running and accessible via the URIs specified.

5. **Run the server**

   ```bash
   node server.js
   ```

6. **Test API**

   Use Postman or curl to POST notifications to the endpoint:

   ```http
   POST http://localhost:3000/send
   Content-Type: application/json

   {
     "type": "email",
     "message": "Hello from Postman!",
     "userId": "user123"
   }
   ```

   Supported `type` values: `"email"`, `"sms"`, `"in-app"`

7. **Observe logs**

   The server console logs message consumption, notification sending, retries, and status updates.

---

## Project Structure

- `server.js` - Entry point, sets up Express server and RabbitMQ connection
- `config/rabbitmq.js` - RabbitMQ connection and channel setup
- `config/db.js` - MongoDB connection setup
- `queues/consumer.js` - RabbitMQ consumer that processes notifications and manages retries
- `services/` - Notification services for Email, SMS, In-App
- `models/Notification.js` - Mongoose schema for notification status tracking

---

## Notes

- The retry mechanism re-queues failed notifications up to a max retry count (`MAX_RETRIES` in consumer).
- Notifications and their statuses are persisted to MongoDB for auditing and debugging.
- Email, SMS, and In-App sending services can be replaced with real providers.

---
