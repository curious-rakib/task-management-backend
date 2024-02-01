import { Expose } from 'class-transformer';

export class UserSerializeDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly username: string;

  @Expose()
  readonly email: string;
}
