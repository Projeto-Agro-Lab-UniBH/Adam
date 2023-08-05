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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/modules/auth/decorator/is-public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesAzureService } from '../files/file.azure.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FilesAzureService,
  ) {}

  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const { username, email, password } = dto;

    return this.userService.update(id, {
      username,
      email,
      password,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('upload/image/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const containerName = 'image';
    const upload = await this.fileService.uploadFile(file, containerName);
    return await this.userService.uploadImage(id, upload, containerName);
  }
}
