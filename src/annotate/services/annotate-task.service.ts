import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnotateTask } from '../entities/annotate-task.entity';
import { Repository } from 'typeorm';
import { AnnotateTaskDto } from '../DTO/annotate-task.dto';
import { UserService } from '../../user/user.service';
import { AnnotateProjectService } from './annotate-project.service';
import * as FfmpegCommand from 'fluent-ffmpeg';
import { join } from 'path';
import * as fs from 'fs/promises';
import { getTempDir } from '../../utils';

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
      .save(join(framesDir, frameFormat))
      .fps(fps);
  });
}

@Injectable()
export class AnnotateTaskService {
  constructor(
    @InjectRepository(AnnotateTask)
    private taskRepo: Repository<AnnotateTask>,
    private projectService: AnnotateProjectService,
    private userService: UserService,
  ) {}

  async createTask(dto: AnnotateTaskDto, video: Express.Multer.File) {
    const task = new AnnotateTask();
    const creator = await this.userService.findUser(dto.creatorId);
    const executor = await this.userService.findUser(dto.executorId);
    const project = await this.projectService.findProjectById(dto.projectId);

    task.creator = creator;
    task.executor = executor;
    task.project = project;

    const videoName = video.originalname;
    task.name = videoName;

    const tempVideoPath = join(getTempDir(), videoName);
    await fs.writeFile(tempVideoPath, video.buffer);
    const framesDir = task.getFramesDir();
    await fs.mkdir(framesDir, { recursive: true });
    await extractFrames(tempVideoPath, framesDir);

    await this.taskRepo.save(task);
  }
}
