import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnotateTask } from '../entities/annotateTask.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnotateTaskService implements OnModuleInit {
  constructor(
    @InjectRepository(AnnotateTask)
    private annotateTasksRepo: Repository<AnnotateTask>,
  ) {}

  async onModuleInit() {
    await this.tryGenerateOne();
  }

  async tryGenerateOne() {
    const taskCount = await this.annotateTasksRepo.count();
    if (taskCount > 0) return;

    const annotateTask = new AnnotateTask();
    annotateTask.framesDir = 'test-frames';

    return await this.annotateTasksRepo.save(annotateTask);
  }
}
