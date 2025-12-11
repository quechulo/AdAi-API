import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';
import { GeminiService } from './gemini/gemini.service';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes env vars available everywhere
    }),
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, GeminiService],
})
export class AppModule {}
