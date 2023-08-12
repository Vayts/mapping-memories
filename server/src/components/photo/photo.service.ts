import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as process from 'process';

@Injectable()
export class PhotoService {
  upload(file: any, folder: string) {
    const s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    const type = file.mimetype.split('/').pop();
    const fileBody = file.buffer;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fileBody,
      Key: `${folder}/${file.originalname}.${type}`,
    };

    return s3.upload(uploadParams).promise();
  }

  multiplyUpload(files: any[] | File[], folder: string) {
    const promiseArr: Promise<any>[] = [];
    files.forEach((el: any) => {
      promiseArr.push(this.upload(el, folder));
    });
    return Promise.all(promiseArr);
  }
}
