import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnnotateProject } from '../annotate/entities/annotate-project.entity';
import { AnnotateTask } from '../annotate/entities/annotate-task.entity';

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
