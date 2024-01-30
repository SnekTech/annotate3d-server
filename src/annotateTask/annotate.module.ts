import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotateTask } from './entities/annotateTask.entity';
import { AnnotateFrame } from './entities/annotateFrame';
import { AnnotateTaskService } from './services/annotateTask.service';
import { AnnotateTaskController } from './controllers/annotateTask.controller';
import { FfmpegService } from './services/ffmpeg.service';
import { AnnotateProject } from './entities/annotateProject.entity';
import { AnnotateProjectController } from './controllers/annotate-project.controller';
import { AnnotateProjectService } from './services/annotate-project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnotateProject, AnnotateTask, AnnotateFrame]),
  ],
  controllers: [AnnotateTaskController, AnnotateProjectController],
  providers: [AnnotateProjectService, AnnotateTaskService, FfmpegService],
})
export class AnnotateModule {}
