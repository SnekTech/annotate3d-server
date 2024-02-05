import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { join } from 'path';
import { User } from '../../user/user.entity';
import { AnnotateTask } from './annotate-task.entity';
import { getAnnotateProjectsDir } from '../../utils';

@Entity()
export class AnnotateProject {
  @PrimaryGeneratedColumn()
  projectId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  modelName: string;

  // comma separated array
  @Column({ default: '' })
  targetBones: string;

  @ManyToOne(() => User, (user) => user.createdProjects)
  creator: User;

  @OneToMany(() => AnnotateTask, (task) => task.project)
  tasks: AnnotateTask[];

  getProjectDir() {
    return join(getAnnotateProjectsDir(), this.name);
  }

  getTargetBones() {
    return this.targetBones.split(',');
  }
}
