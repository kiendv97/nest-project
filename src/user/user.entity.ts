import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, BeforeUpdate } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { BookEntity } from '../book/book.entity';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
  @BeforeUpdate() 
  async updateProfile() {
    this.updatedAt = new Date
  }
  @OneToMany(type => BookEntity, book => book.author)
  books: BookEntity[];
}
