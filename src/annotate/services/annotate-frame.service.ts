import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnotateFrame } from '../entities/annotate-frame.entity';
import { Repository } from 'typeorm';
import { AnnotateTask } from '../entities/annotate-task.entity';

type Quaternion = [number, number, number, number];
export type Pose = Record<string, Quaternion>;

const DEFAULT_ROTATION: Quaternion = [0, 0, 0, 1];

@Injectable()
export class AnnotateFrameService {
  constructor(
    @InjectRepository(AnnotateFrame)
    private frameRepo: Repository<AnnotateFrame>,
  ) {}

  private getDefaultPose(targetBones: string[]) {
    const pose: Pose = {};
    for (const boneName of targetBones) {
      pose[boneName] = DEFAULT_ROTATION;
    }
    return pose;
  }

  async createFrame(index: number, task: AnnotateTask) {
    const newFrame = new AnnotateFrame();
    newFrame.index = index;
    newFrame.task = task;
    newFrame.pose = this.getDefaultPose(task.project.targetBones);

    await this.frameRepo.save(newFrame);
  }

  async findFrameAt(taskId: number, frameIndex: number) {
    return this.frameRepo.findOneBy({
      task: { taskId },
      index: frameIndex,
    });
  }

  async getFrameCountInTask(taskId: number) {
    return await this.frameRepo.countBy({ task: { taskId } });
  }

  async updateFramePose(frameId: number, newPose: Pose) {
    const frame = await this.frameRepo.findOneBy({ frameId });
    frame.pose = newPose;
    await this.frameRepo.save(frame);
  }
}
