import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { IsPublic } from './decorator/is-public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
