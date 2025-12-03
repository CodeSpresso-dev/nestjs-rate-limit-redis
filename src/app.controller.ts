import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('gretting')
  doGretting(): string {
    return 'Hey guys!!!';
  }

  @SkipThrottle({ default: true })
  @Get('hi')
  getHi(): string {
    return 'hi';
  }

  @Throttle({ default: { ttl: 10 * 1000, limit: 6 } })
  @Get('bye')
  getBye(): string {
    return 'Babay';
  }
}
