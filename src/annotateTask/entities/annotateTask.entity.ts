import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnotateFrame } from './annotateFrame';
import { User } from '../../user/user.entity';
import { AnnotateProject } from './annotateProject.entity';

@Entity()
export class AnnotateTask {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column()
  framesDir: string;

  @OneToMany(() => AnnotateFrame, (frame) => frame.task)
  frames: AnnotateFrame[];

  @ManyToOne(() => User, (user) => user.createdTasks)
  creator: User;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  executor: User;

  @ManyToOne(() => AnnotateProject, project => project.tasks)
  project: AnnotateProject
}
