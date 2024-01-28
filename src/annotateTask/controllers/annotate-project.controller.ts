import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('annotate-project')
export class AnnotateProjectController {
  @Post('model-upload')
  @UseInterceptors(FileInterceptor('model'))
  uploadModel(@UploadedFile() file: File) {
    console.log(file);
  }
}
