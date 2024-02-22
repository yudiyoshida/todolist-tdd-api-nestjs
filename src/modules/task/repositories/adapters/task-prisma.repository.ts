import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateTaskDto } from '../../use-cases/create-task/dtos/create-task.dto';
import { ITaskRepository } from '../task-repository.interface';

@Injectable()
export class TaskPrismaRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  findAllWithPagination(page: number, size: number) {
    return this.prisma.$transaction([
      this.prisma.task.findMany({
        take: size,
        skip: (page - 1) * size,
      }),
      this.prisma.task.count(),
    ]);
  }

  public findAllNoPagination() {
    return this.prisma.task.findMany();
  }

  public findById(id: string, accountId: string) {
    return this.prisma.task.findUnique({
      where: { id, accountId },
    });
  }

  public save(data: CreateTaskDto, accountId: string) {
    return this.prisma.task.create({
      data: {
        ...data,
        isDone: false,
        account: {
          connect: { id: accountId },
        },
      },
    });
  }

  public updateStatus(id: string, status: boolean) {
    return this.prisma.task.update({
      where: { id },
      data: { isDone: status },
    });
  }

  public delete(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
