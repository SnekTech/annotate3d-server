import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnotateFrame } from '../entities/annotate-frame';
import { Repository } from 'typeorm';
import { AnnotateTask } from '../entities/annotate-task.entity';

type Quaternion = [number, number, number, number];
type Pose = Record<string, Quaternion>;

const DEFAULT_ROTATION: Quaternion = [0, 0, 0, 1];

@Injectable()
export class AnnotateFrameService {
  constructor(
    @InjectRepository(AnnotateFrame)
    private frameRepo: Repository<AnnotateFrame>,
  ) {}

  async createFrame(index: number, task: AnnotateTask) {
    const newFrame = new AnnotateFrame();
    newFrame.index = index;
    newFrame.task = task;

    const pose: Pose = {};
    const targetBones = task.project.getTargetBones();
    for (const boneName of targetBones) {
      pose[boneName] = DEFAULT_ROTATION;
    }
    newFrame.poseData = JSON.stringify(pose);

    await this.frameRepo.save(newFrame);
  }
}
