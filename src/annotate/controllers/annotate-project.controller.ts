import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnnotateProjectDTO } from '../DTO/annotate-project.dto';
import { AnnotateProjectService } from '../services/annotate-project.service';

@Controller('projects')
export class AnnotateProjectController {
  constructor(private projectService: AnnotateProjectService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('model'))
  async createProject(
    @UploadedFile() modelFile: Express.Multer.File,
    @Body() body: AnnotateProjectDTO,
  ) {
    await this.projectService.createProject(body, modelFile);
  }
}
