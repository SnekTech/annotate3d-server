import { Injectable } from '@nestjs/common';
import * as fsPromise from 'fs/promises';
import { join } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnotateProject } from '../entities/annotate-project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AnnotateProjectDTO } from '../DTO/annotate-project.dto';
import { UserService } from '../../user/user.service';
import { getAnnotateProjectsDir, getModelsDir } from '../../utils';

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

  async createProject(dto: AnnotateProjectDTO, model: Express.Multer.File) {
    const project = new AnnotateProject();
    const modelName = model.originalname;
    await this.saveModel(model);
    project.name = dto.projectName;
    project.modelName = modelName;
    project.creator = await this.userService.findUser(dto.creatorId);
    project.targetBones = dto.targetBones;
    await this.projectRepo.save(project);

    const projectDir = join(getAnnotateProjectsDir(), project.name);
    await fsPromise.mkdir(projectDir, { recursive: true });
    console.log('created annotate project directory: ', projectDir);
  }

  async deleteProjectById(id: number) {
    await this.projectRepo.delete(id);
  }

  async deleteAllProjects() {
    await this.projectRepo.clear();
  }

  async findProjectById(id: number) {
    return await this.findOneProjectBy({ projectId: id });
  }

  async findOneProjectBy(findOptions: FindOptionsWhere<AnnotateProject>) {
    return await this.projectRepo.findOneBy(findOptions);
  }

  findProjectsCreatedBy(creatorId: number) {
    return this.projectRepo.findBy({
      creator: { userId: creatorId },
    });
  }
}
