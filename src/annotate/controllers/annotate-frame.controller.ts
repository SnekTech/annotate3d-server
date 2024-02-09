import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AnnotateFrameService } from '../services/annotate-frame.service';
import { AnnotateFrameDTO } from '../DTO/annotate-frame.dto';

@Controller('frames')
export class AnnotateFrameController {
  constructor(private frameService: AnnotateFrameService) {}

  @Get('task/:taskId/at/:index')
  getFrameFromTaskAt(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('index', ParseIntPipe) index: number,
  ) {
    return this.frameService.findFrameAt(taskId, index);
  }

  @Post(':frameId')
  async updateFrame(
    @Param('frameId', ParseIntPipe) frameId: number,
    @Body() body: AnnotateFrameDTO,
  ) {
    await this.frameService.updateFramePose(frameId, body.pose);
  }
}
