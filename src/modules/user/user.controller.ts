import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/modules/auth/decorator/is-public.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @HttpCode(HttpStatus.FOUND)
  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @Get('/me')
  getMe(@CurrentUser() currentUser: User) {
    return { user: currentUser };
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
