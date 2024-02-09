import { Pose } from '../services/annotate-frame.service';

export interface AnnotateFrameDTO {
  pose: Pose;
  isAnnotated: boolean;
}
