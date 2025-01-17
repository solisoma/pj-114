/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import multer from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor() {
    const baseUploadPath = './uploads';
    if (!fs.existsSync(baseUploadPath)) {
      fs.mkdirSync(baseUploadPath, { recursive: true });
    }
  }

  getUploadMiddleware(
    multerFields: { name: string; maxCount: number }[],
    formats: string[],
  ) {
    const multerInstance = multer({
      storage: diskStorage({
        destination: (_, __, cb) => {
          cb(null, '../public');
        },
        filename: (_, file, cb) => {
          const fileExtName = extname(file.originalname);
          const fileFormat = file.mimetype.split('/')[1];
          if (!formats.includes(fileFormat)) {
            return cb(
              new Error(
                `Invalid file format. Please upload files in one of the following formats: ${formats.join(', ')}`,
              ),
              undefined,
            );
          }
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.random().toString(36).substring(2, 15))
            .join('');
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        const fileFormat = file.mimetype.split('/')[1];
        if (!formats.includes(fileFormat)) {
          return cb(
            new Error(
              `Invalid file format. Only ${formats.join(', ')} are allowed.`,
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    });

    return (req: any, res: any) => {
      return new Promise<void>((resolve, reject) => {
        multerInstance.fields(multerFields)(req, res, (err: any) => {
          if (err) {
            console.error(err);
            reject(res.status(502).json({ error: err.message }));
          } else {
            resolve();
          }
        });
      });
    };
  }
}
