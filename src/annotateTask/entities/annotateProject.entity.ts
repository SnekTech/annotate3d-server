import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { AnnotateTask } from './annotateTask.entity';

@Entity()
export class AnnotateProject {
  @PrimaryGeneratedColumn()
  projectId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  modelPath: string;

  // comma separated array
  @Column({default: ''})
  targetBones: string;

  @ManyToOne(() => User, (user) => user.createdProjects)
  creator: User;

  @OneToMany(() => AnnotateTask, (task) => task.project)
  tasks: AnnotateTask[];
}
