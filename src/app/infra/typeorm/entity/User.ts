import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text',{nullable:true})
  firstName!: string;

  @Column('text',{nullable:true})
  lastName!: string;

  @Column('text',{nullable:true})
  email!: string;

  @Column('text',{nullable:true})
  password!: string;
}
