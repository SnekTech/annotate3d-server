import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
    const foundProject = await this.projectService.findOneProjectBy({
      name: body.projectName,
    });
    if (foundProject != null) throw new BadRequestException('项目名称重复');

    await this.projectService.createProject(body, modelFile);
  }

  @Post('delete/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    await this.projectService.deleteProjectById(id);
  }

  @Delete('delete/all')
  async deleteAllProjects() {
    await this.projectService.deleteAllProjects();
  }

  @Get('created-by/:id')
  getProjectsCreatedByUser(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findProjectsCreatedBy(id);
  }
}
