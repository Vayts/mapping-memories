import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as process from 'process';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
  }
  upload(file: any, folder: string) {
    const type = file.mimetype.split('/').pop();
    const fileBody = file.buffer;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fileBody,
      Key: `${folder}/${file.originalname}.${type}`,
    };

    return this.s3.upload(uploadParams).promise();
  }

  multiplyUpload(files: any[] | File[], folder: string) {
    if (files && files.length) {
      const promiseArr: Promise<any>[] = [];
      files.forEach((el: any) => {
        promiseArr.push(this.upload(el, folder));
      });
      return Promise.all(promiseArr);
    }
    return Promise.all([]);
  }

  async downloadFileFromAws(folder: string, key: string) {
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${key}`,
    };

    try {
      const { Body } = await this.s3.getObject(getObjectParams).promise();
      if (Body instanceof Buffer) {
        return Body;
      } else if (Body instanceof Readable) {
        return new Promise<Buffer>((resolve, reject) => {
          const chunks: Uint8Array[] = [];
          Body.on('data', (chunk) => chunks.push(chunk));
          Body.on('end', () => resolve(Buffer.concat(chunks)));
          Body.on('error', reject);
        });
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
