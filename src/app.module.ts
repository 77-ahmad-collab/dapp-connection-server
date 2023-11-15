import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket.module';

@Module({
  imports: [SocketModule], // Include the SocketModul
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
