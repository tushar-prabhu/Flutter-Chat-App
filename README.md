# Flutter Chat App with WebSocket

This Flutter application and Node.js backend server demonstrate a simple real-time chat application using WebSocket communication.

## Features

- Real-time messaging using WebSocket.
- Simple and intuitive user interface.
- Visual indication of connection status in the app bar.
- Ability to send and receive messages.

## Prerequisites

### Flutter App

Before running the app, make sure you have the following:

- Flutter installed on your development environment.
- A WebSocket server running. You can use a local server for testing.

### Node.js Backend

Before running the backend server, ensure you have the following:

- Node.js installed on your server.
- The required npm packages installed. You can install them by running:

  ```bash
  npm install express moment ws
  ```

## Getting Started

### Flutter App

1. Navigate to the project directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   flutter pub get
   ```

3. Open the project in your preferred Flutter development environment.

4. Update the WebSocket server URL:

   Open the `channelconnect` method in the `ChatPageState` class, and modify the WebSocket server URL:

   ```dart
   channel = IOWebSocketChannel.connect("ws://your-server-ip:your-server-port/$myid");
   ```

5. Run the app on two devices or simulators/emulators.

### Node.js Backend

1. Navigate to the project directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. The server will be running at `http://localhost:8000`. You can customize the port in the code.

## Usage

1. Launch the Flutter app on two devices or simulators/emulators.

2. Each instance of the app can act as a sender or receiver. Update the `myid` and `receiverid` variables in the `ChatPageState` class accordingly.

3. Messages sent from one instance will be received by the other, creating a chat experience.

## Code Structure

- `ChatPage`: The main widget for the chat page.
- `ChatPageState`: Manages the state of the `ChatPage` widget, including WebSocket connection and message handling.
- `MessageData`: Represents the model for chat messages.

## WebSocket Server

- The WebSocket server is initiated using the `ws` library on port 6060.
- It listens for incoming connections and assigns a unique user ID based on the URL path.

## WebSocket Events

### Connection

- When a WebSocket connection is established, the server logs the user ID and adds the connection to the `webSockets` object.

### Message Reception

- The server listens for incoming messages from clients.
- It validates the message format and authentication key.
- If authentication is successful and the message is of the "send" type, it forwards the message to the recipient's WebSocket connection.

### Disconnection

- When a WebSocket connection is closed, the server removes the corresponding entry from the `webSockets` object.

## Customization

- Change the port number in the `const port = 8000;` line to the desired port for HTTP connections.
- Modify the WebSocket server port in `const wss = new WebSocket.Server({ port: 6060 });` as needed.

---
