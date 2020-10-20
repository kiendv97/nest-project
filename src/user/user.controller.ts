import { Body, Controller, Get, Put, Post } from '@nestjs/common';
import { IUserRO } from './user.interface'
import { UserService } from './user.service'
import { User } from './user.decorator'
import {CreateUserDto, UpdateUserDto} from './dto/userDTO'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('me')
  async getMe(@Body('email') email: string): Promise<IUserRO> {
    return await this.userService.findMe(email)
  }
  @Put('me')
  async updateMe(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return await this.userService.updateUser(userId, userData);
  }
  @Post('me') 
  async createMe(@Body('user') userData: CreateUserDto) { 
    return await this.userService.createUser(userData)
  }

}
