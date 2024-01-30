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
  constructor(private projectService: AnnotateProjectService) {
  }
  @Post('model-upload')
  @UseInterceptors(FileInterceptor('model'))
  uploadModel(@UploadedFile() file: File) {
    console.log(file);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('model'))
  async createProject(
    @UploadedFile() modelFile: Express.Multer.File,
    @Body() body: AnnotateProjectDTO,
  ) {
    console.log(modelFile);
    console.log(body);
    const modelPath = await this.projectService.saveModel(modelFile);
    await this.projectService.createProject(body, modelPath)
  }
}
