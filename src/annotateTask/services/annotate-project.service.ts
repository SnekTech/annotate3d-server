import { Injectable } from '@nestjs/common';
import * as fsPromise from 'fs/promises';
import { join } from 'path';

function getModelsDir() {
  return join(global.__baseDir, '../public/models');
}

@Injectable()
export class AnnotateProjectService {
  async saveModel(model: Express.Multer.File) {
    const location = join(getModelsDir(), model.originalname);

    await fsPromise.writeFile(location, model.buffer);
    console.log('model saved successfully');
    return location;
  }
}
