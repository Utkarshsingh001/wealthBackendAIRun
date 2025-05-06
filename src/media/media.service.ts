import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  async optimizeFile(file: Express.Multer.File): Promise<string> {
    const inputPath = file.path;
    const outputFilename = `optimized-${file.filename}`;
    const outputPath = path.join('uploads', outputFilename);

    // Optional: Optimize the image (resize, compress)
    await sharp(inputPath)
      .resize({ width: 1024 })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // Remove the original file after optimization
    fs.unlinkSync(inputPath);

    return outputFilename;
  }
}
