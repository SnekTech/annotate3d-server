import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnotateFrame } from './annotate-frame';
import { User } from '../../user/user.entity';
import { AnnotateProject } from './annotate-project.entity';
import { join } from 'path';

@Entity()
export class AnnotateTask {
  @PrimaryGeneratedColumn()
  taskId: number;

  /**
   * default to the video filename
   */
  @Column()
  name: string;

  @OneToMany(() => AnnotateFrame, (frame) => frame.task)
  frames: AnnotateFrame[];

  @ManyToOne(() => User, (user) => user.createdTasks)
  creator: User;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  executor: User;

  @ManyToOne(() => AnnotateProject, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  project: AnnotateProject;

  getFramesDir() {
    return join(this.project.getProjectDir(), this.name);
  }
}
