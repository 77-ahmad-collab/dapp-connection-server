// src/socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Server initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // This is where you can handle messages from React App 1 and emit messages to React App 2.
  @SubscribeMessage('eth_requestAccounts')
  handleMessage(client: any, payload: any): string {
    console.log(
      '🚀 ~ file: socket.gateway.ts:37 ~ handleMessage ~ payload:',
      payload,
    );
    this.server.emit('eth_requestAccounts');
    return 'Hello world!';
  }
  @SubscribeMessage('connect_account')
  handleConnectAccount(client: any, payload: any): string {
    console.log(
      '🚀 ~ file: socket.gateway.ts:37 ~ handleMessage ~ payload:',
      payload,
    );
    this.server.emit('connect_account', { payload });
    return 'Hello world!';
  }
  @SubscribeMessage('sendTransaction')
  handleSendTransactionMessage(client: any, payload: any): string {
    console.log('🚀 ~ file: sockeload:', payload);
    this.server.emit('onTransactionSend', { payload: payload.payLoad });
    return 'Hello world!';
  }
}
