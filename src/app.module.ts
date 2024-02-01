import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    // Add the TypeOrmModule.forRoot() method to the imports array
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Task],
      synchronize: true,
    }),
    // Add the ConfigModule.forRoot() method to the imports array
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  // Add the AuthGuard to the global providers
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
