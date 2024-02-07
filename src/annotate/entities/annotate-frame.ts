import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnnotateTask } from './annotate-task.entity';

@Entity()
export class AnnotateFrame {
  @PrimaryGeneratedColumn()
  frameId: number;

  @Column()
  index: number;

  @Column({ default: '{}' })
  poseData: string;

  @Column({ default: false })
  isAnnotated: boolean;

  @ManyToOne(() => AnnotateTask, (task) => task.frames, { onDelete: 'CASCADE' })
  task: AnnotateTask;
}
