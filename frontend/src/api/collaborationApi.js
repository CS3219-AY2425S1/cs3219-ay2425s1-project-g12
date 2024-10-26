import io from 'socket.io-client';

let socket;

export const initializeSocket = (userId, roomId) => {
    if (!userId) {
        throw new Error('User ID is required to initialize the socket connection');
    }

    socket = io('http://localhost:3004', {
        query: { id: userId },
        transports: ['websocket', 'polling'],
        withCredentials: true,
    })

    socket.on('connect', () => {
        console.log(`Connected to collaboration service for user ${userId} in room ${roomId}`);
        socket.emit('join-room', roomId, userId);
    })

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
    });
    
    socket.on('disconnect', () => {
        console.log(`Disconnected from matching service for user ${userId}`);
    });

    return new Promise((resolve, reject) => {
        socket.on('connect', () => resolve(socket));
        socket.on('connect_error', (error) => reject(error));
    })
}

export const sendMessage = (roomId, userId, message) => {
    if (!socket || !socket.connected) {
        throw new Error('Socket not connected. Please initialize first.');
    }

    socket.emit('message', {userId, roomId, message});
}

export const listenForMessages = (onMessageReceived) => {
    if (!socket || !socket.connected) {
      throw new Error('Socket not connected. Please initialize first.');
    }
  
    socket.on('receive-message', onMessageReceived);
};