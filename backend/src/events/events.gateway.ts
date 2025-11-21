import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(`user_${userId}`);
      console.log(`Client connected: ${client.id}, joined room user_${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyUserUpdate(userId: string, payload: any) {
    this.server.to(`user_${userId}`).emit('playerUpdated', payload);
  }
}
