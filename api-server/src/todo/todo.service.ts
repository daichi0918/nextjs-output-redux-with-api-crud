import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        content: createTodoDto.content,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return await this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.todo.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        content: updateTodoDto.content,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
