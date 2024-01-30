import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnnotateTaskService } from '../services/annotate-task.service';
import { AnnotateTaskDto } from '../DTO/annotate-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tasks')
export class AnnotateTaskController {
  constructor(private annotateTaskService: AnnotateTaskService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @UploadedFile() video: Express.Multer.File,
    @Body() body: AnnotateTaskDto,
  ) {
    await this.annotateTaskService.createTask(body, video);
  }
}
