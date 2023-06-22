import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(new AuthGuard())
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return 'magic';
  }
}
