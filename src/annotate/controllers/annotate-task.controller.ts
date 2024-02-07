import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnnotateTaskService } from '../services/annotate-task.service';
import { AnnotateTaskDto } from '../DTO/annotate-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnnotateProjectService } from '../services/annotate-project.service';

@Controller('tasks')
export class AnnotateTaskController {
  constructor(
    private annotateTaskService: AnnotateTaskService,
    private annotateProjectService: AnnotateProjectService,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @UploadedFile() video: Express.Multer.File,
    @Body() dto: AnnotateTaskDto,
  ) {
    const projectId = dto.projectId;
    const project = await this.annotateProjectService.findProjectById(
      projectId,
    );
    if (project == null)
      throw new BadRequestException(`project with id: ${projectId}  not found`);

    await this.annotateTaskService.createTask(dto, video, project);
  }

  @Get('assigned-to/:executorId')
  getTasksAssignedToUser(
    @Param('executorId', ParseIntPipe) executorId: number,
  ) {
    return this.annotateTaskService.findTasksAssignedToUser(executorId);
  }
}
