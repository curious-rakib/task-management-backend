import { Expose } from 'class-transformer';

export class TaskSerializeDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly title: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly status: string;
}
