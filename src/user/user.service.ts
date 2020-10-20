import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRO } from './user.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm' // inject orm
import { UserEntity } from './user.entity'
import jwt from 'jsonwebtoken'
import { UpdateUserDto, CreateUserDto } from './dto/userDTO'
import { SECRET } from '../config';
import { validate } from 'class-validator';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }
  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    let { username, password, email } = dto
    let queryBuilder = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .orWhere('user.email = :email', { email: email })

    let user = queryBuilder.getOne()
    if (user) {
      throw new HttpException({ message: 'Username or email existed' }, HttpStatus.BAD_REQUEST)
    }
    let newUser = new UserEntity()
    newUser.username = username
    newUser.password = password
    newUser.email = email
    newUser.books = []
    if ((await validate(newUser)).length > 0) {
      throw new HttpException({ message: 'Input value failed' }, HttpStatus.BAD_REQUEST)
    } else {
      return await this.userRepository.save(newUser)
    }
  }
  async updateUser(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    let toUpdate = this.userRepository.findOne(id)
    if (!!toUpdate) {
      delete (await toUpdate).password
    }
    let updated = Object.assign(toUpdate, dto)
    return await this.userRepository.save(updated)
  }
  async findMe(email): Promise<IUserRO> {
    let user = await this.userRepository.findOne({ email: email })

    if (!!user) {
      return this.buildUserRO(user)
    } else {
      return null
    }
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      username: user.username,
      password: user.password,
      email: user.email,
      bio: user.bio,
      books: user.books,
      token: this.generateJWT(user),
      image: user.image
    }
    return { user: userRO }
  }
  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };

}
