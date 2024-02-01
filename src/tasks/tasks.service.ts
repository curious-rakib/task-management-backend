import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepository.findOne({
      where: { id: createTaskDto.userId },
      relations: {
        tasks: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found !', HttpStatus.NOT_FOUND);
    }

    const newTask = this.taskRepository.create(createTaskDto);
    await this.taskRepository.save(newTask);

    user.tasks = [...user.tasks, newTask];
    await this.userRepository.save(user);

    return newTask;
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findAllUserTasks(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        tasks: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found !', HttpStatus.NOT_FOUND);
    }

    return user.tasks;
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update({ id }, updateTaskDto);
  }

  async remove(id: number) {
    return await this.taskRepository.delete({ id });
  }
}
