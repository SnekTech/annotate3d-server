import { Controller, Post } from '@nestjs/common';
import { AnnotateTaskService } from '../services/annotateTask.service';

@Controller('annotate-task')
export class AnnotateTaskController {
  constructor(private annotateTaskService: AnnotateTaskService) {}
}
