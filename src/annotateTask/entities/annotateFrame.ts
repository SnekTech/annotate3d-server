import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnnotateTask } from './annotateTask.entity';

@Entity()
export class AnnotateFrame {
  @PrimaryGeneratedColumn()
  frameId: number

  @Column()
  index: number

  @Column()
  poseData: string

  @ManyToOne(() => AnnotateTask, task => task.frames)
  task: AnnotateTask
}