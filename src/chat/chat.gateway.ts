import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GeminiService } from '../gemini/gemini.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow connections from your Vue app
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly geminiService: GeminiService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() payload: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { message } = payload;
    
    // Emit immediate confirmation (optional)
    client.emit('botResponse', { 
        type: 'status', 
        content: 'Thinking...' 
    });

    try {
      // Basic non-streaming response for now
      const response = await this.geminiService.generateText(message);
      
      client.emit('botResponse', {
        type: 'text',
        content: response,
      });
      
    } catch (error) {
      client.emit('error', { message: 'Something went wrong processing your request.' });
    }
  }
}