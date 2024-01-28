import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotateTask } from './entities/annotateTask.entity';
import { AnnotateFrame } from './entities/annotateFrame';
import { AnnotateTaskService } from './services/annotateTask.service';
import { AnnotateTaskController } from './controllers/annotateTask.controller';
import { FfmpegService } from './services/ffmpeg.service';
import { AnnotateProject } from './entities/annotateProject.entity';
import { AnnotateProjectController } from './controllers/annotate-project.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnotateProject, AnnotateTask, AnnotateFrame]),
  ],
  controllers: [AnnotateTaskController, AnnotateProjectController],
  providers: [AnnotateTaskService, FfmpegService],
})
export class AnnotateModule {}
