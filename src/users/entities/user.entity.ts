import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: false })
  email: string;

  @Column({ unique: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;
}
