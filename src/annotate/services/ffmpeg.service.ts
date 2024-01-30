import { Injectable } from '@nestjs/common';
import * as FfmpegCommand from 'fluent-ffmpeg';
import { join } from 'path';

@Injectable()
export class FfmpegService {
  static extractFrames(
    videoPath: string,
    framesDir: string,
    fps = 1,
    frameFormat = 'frame_%03d.png',
  ) {
    return new Promise((resolve, reject) => {
      const command = FfmpegCommand(videoPath);
      command
        .on('error', (err) => reject(err))
        .on('end', () => resolve('ffmpeg processing finished'))
        .save(join(framesDir, frameFormat))
        .fps(fps);
    });
  }
}
