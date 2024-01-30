import { Injectable } from '@nestjs/common';
import * as fsPromise from 'fs/promises';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnotateProject } from '../entities/annotateProject.entity';
import { Repository } from 'typeorm';
import { AnnotateProjectDTO } from '../DTO/annotate-project.dto';
import { UserService } from '../../user/user.service';

function getModelsDir() {
  return join(global.__baseDir, '../public/models');
}

@Injectable()
export class AnnotateProjectService {
  constructor(
    @InjectRepository(AnnotateProject)
    private projectRepo: Repository<AnnotateProject>,
    private userService: UserService,
  ) {}

  async saveModel(model: Express.Multer.File) {
    const location = join(getModelsDir(), `${model.originalname}`);

    await fsPromise.writeFile(location, model.buffer);
    console.log('model saved successfully');
    return location;
  }

  async createProject(dto: AnnotateProjectDTO, modelPath: string) {
    const project = new AnnotateProject();
    project.name = dto.projectName;
    project.modelPath = modelPath;
    project.creator = await this.userService.findUser(dto.creatorId);
    await this.projectRepo.save(project)
  }
}
