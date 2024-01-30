import { Controller, Post } from '@nestjs/common';
import { AnnotateTaskService } from '../services/annotate-task.service';

@Controller('annotate-task')
export class AnnotateTaskController {
  constructor(private annotateTaskService: AnnotateTaskService) {}
}
