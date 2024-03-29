import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Task Title',
    description: 'The title of a task. Must be a non-empty string.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of a task. Must be a non-empty string.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 'InProgress',
    description: 'The status of a task. Must be a non-empty string.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @ApiProperty({
    example: 1,
    description: 'The id of a user. Must be a positive number.',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly userId: number;
}
