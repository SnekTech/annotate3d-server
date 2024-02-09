import {
  AfterLoad,
  BeforeInsert,
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
  targetBonesString: string;

  targetBones: string[];

  @ManyToOne(() => User, (user) => user.createdProjects, { eager: true })
  creator: User;

  @OneToMany(() => AnnotateTask, (task) => task.project)
  tasks: AnnotateTask[];

  get projectDir() {
    return join(getAnnotateProjectsDir(), this.name);
  }

  @BeforeInsert()
  joinTargetBonesString() {
    this.targetBonesString = this.targetBones.join(',');
  }

  @AfterLoad()
  splitTargetBones() {
    this.targetBones = this.targetBonesString.split(',');
  }
}
