import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import {
  ExecutionContext,
  Module,
  NotAcceptableException,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  minutes,
  seconds,
  ThrottlerGuard,
  ThrottlerModule,
} from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          limit: 6,
          ttl: seconds(10),
          blockDuration: minutes(2),
        },
        { name: 'short', limit: 3, ttl: seconds(4), blockDuration: minutes(3) },
        { name: 'medium', limit: 10, ttl: seconds(30) },
        { name: 'long', limit: 25, ttl: seconds(80) },
      ],
      errorMessage:
        'Wow! Too many requets. You should wait a couple of secounds',
      storage: new ThrottlerStorageRedisService(),
      getTracker: (req: Record<string, any>, context: ExecutionContext) => {
        const deviceId = req.headers['x-device-id'];
        if (!deviceId) throw new NotAcceptableException();
        return req.headers['x-device-id'];
      },
      generateKey: (
        context: ExecutionContext,
        trackerString: string,
        throttlerName: string,
      ) => {
        return trackerString;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
