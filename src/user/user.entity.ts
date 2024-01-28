import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnnotateProject } from '../annotateTask/entities/annotateProject.entity';
import { AnnotateTask } from '../annotateTask/entities/annotateTask.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('varchar')
  nickname = 'Jane Doe';

  @Column('varchar')
  phone = '1XXXXXXXXXX';

  @Column('boolean')
  isAdmin = false;

  @OneToMany(() => AnnotateProject, (project) => project.creator)
  createdProjects: AnnotateProject[];

  @OneToMany(() => AnnotateTask, (task) => task.creator)
  createdTasks: AnnotateTask[];

  @OneToMany(() => AnnotateTask, (task) => task.executor)
  assignedTasks: AnnotateTask[];
}
