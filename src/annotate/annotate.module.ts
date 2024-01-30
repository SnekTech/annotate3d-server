import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotateTask } from './entities/annotate-task.entity';
import { AnnotateFrame } from './entities/annotate-frame';
import { AnnotateTaskService } from './services/annotate-task.service';
import { AnnotateTaskController } from './controllers/annotate-task.controller';
import { AnnotateProject } from './entities/annotate-project.entity';
import { AnnotateProjectController } from './controllers/annotate-project.controller';
import { AnnotateProjectService } from './services/annotate-project.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnotateProject, AnnotateTask, AnnotateFrame]),
    UserModule,
  ],
  controllers: [AnnotateTaskController, AnnotateProjectController],
  providers: [AnnotateProjectService, AnnotateTaskService],
})
export class AnnotateModule {}
