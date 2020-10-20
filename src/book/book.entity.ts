import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,BeforeUpdate } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('book')
export class BookEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({default: ''})
  description: string;

  @Column({default: ''})
  body: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date;
  }

  @ManyToOne(type => UserEntity, user => user.books)
  author: UserEntity

}