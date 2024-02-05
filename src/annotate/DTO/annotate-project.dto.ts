export class AnnotateProjectDTO {
  projectName: string;
  creatorId: number;
  targetBones: string[];
  /**
   * model file is uploaded using 'model' field
   * in FormData
   */
}
