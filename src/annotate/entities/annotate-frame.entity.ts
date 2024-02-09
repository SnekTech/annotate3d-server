import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnotateTask } from './annotate-task.entity';
import { Pose } from '../services/annotate-frame.service';

@Entity()
export class AnnotateFrame {
  @PrimaryGeneratedColumn()
  frameId: number;

  @Column()
  index: number;

  /*
  don't write this field directly
   */
  @Column({ default: '{}' })
  poseData: string;

  @Column({ default: false })
  isAnnotated: boolean;

  @ManyToOne(() => AnnotateTask, (task) => task.frames, { onDelete: 'CASCADE' })
  task: AnnotateTask;

  pose: Pose;

  @BeforeInsert()
  @BeforeUpdate()
  serializePoseData() {
    this.poseData = JSON.stringify(this.pose);
  }

  @AfterLoad()
  deserializePose() {
    this.pose = JSON.parse(this.poseData);
  }
}
