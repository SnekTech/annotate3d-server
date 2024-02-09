import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnotateFrame } from './annotate-frame.entity';
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

  @ManyToOne(() => User, (user) => user.createdTasks, { eager: true })
  creator: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { eager: true })
  executor: User;

  @ManyToOne(() => AnnotateProject, (project) => project.tasks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  project: AnnotateProject;

  get framesDir() {
    return join(this.project.projectDir, this.name);
  }
}
