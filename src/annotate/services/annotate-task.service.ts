import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnotateTask } from '../entities/annotate-task.entity';
import { Repository } from 'typeorm';
import { AnnotateTaskDto } from '../DTO/annotate-task.dto';
import { UserService } from '../../user/user.service';
import * as FfmpegCommand from 'fluent-ffmpeg';
import { join } from 'path';
import * as fs from 'fs/promises';
import { getTempDir } from '../../utils';
import { AnnotateFrameService } from './annotate-frame.service';
import { AnnotateProject } from '../entities/annotate-project.entity';

function extractFrames(
  videoPath: string,
  framesDir: string,
  fps = 1,
  frameFormat = 'frame_%03d.png',
) {
  return new Promise((resolve, reject) => {
    const command = FfmpegCommand(videoPath);
    command
      .on('error', (err) => reject(err))
      .on('end', () => resolve('ffmpeg processing finished'))
      .on('start', (ffCmd: string) => console.log('Executing command: ', ffCmd))
      .outputFPS(fps)
      .save(join(framesDir, frameFormat));
  });
}

@Injectable()
export class AnnotateTaskService {
  constructor(
    @InjectRepository(AnnotateTask)
    private taskRepo: Repository<AnnotateTask>,
    private userService: UserService,
    private frameService: AnnotateFrameService,
  ) {}

  async createTask(
    dto: AnnotateTaskDto,
    video: Express.Multer.File,
    project: AnnotateProject,
  ) {
    const task = new AnnotateTask();
    const creator = await this.userService.findUser(dto.creatorId);
    const executor = await this.userService.findUser(dto.executorId);

    task.creator = creator;
    task.executor = executor;
    task.project = project;

    const videoName = video.originalname;
    task.name = videoName;

    const tempVideoPath = join(getTempDir(), videoName);
    await fs.writeFile(tempVideoPath, video.buffer);
    const framesDir = task.framesDir;
    await fs.mkdir(framesDir, { recursive: true });
    await extractFrames(tempVideoPath, framesDir);

    await this.taskRepo.save(task);

    const frameCount = (await fs.readdir(framesDir)).length;
    await this.createTaskFrames(task, frameCount);
  }

  async findTasksAssignedToUser(userId: number) {
    return await this.taskRepo.findBy({ executor: { userId } });
  }

  async findTaskById(taskId: number) {
    return await this.taskRepo.findOneBy({ taskId });
  }

  private async createTaskFrames(task: AnnotateTask, frameCount: number) {
    for (let i = 0; i < frameCount; i++) {
      await this.frameService.createFrame(i, task);
    }
  }

  getTaskFrameCount(taskId: number) {
    return this.frameService.getFrameCountInTask(taskId);
  }
}
