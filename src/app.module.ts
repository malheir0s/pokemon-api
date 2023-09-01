import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerService } from './controller/controller.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ControllerService],
})
export class AppModule {}
