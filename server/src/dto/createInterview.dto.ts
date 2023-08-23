import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { plainToClass, Transform, Type } from 'class-transformer';
import {
  DynamicLanguagesMinLength,
  DynamicLanguagesStringCheck,
} from '../validators/language.validator';

class InterviewDescription {
  @IsString({ message: 'ONLY_STRING' })
  @IsNotEmpty()
  @MinLength(30)
  value: string;
}

export class CreateInterviewMainInfoDto {
  @IsObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(2)
  @ValidateNested({ each: true })
  readonly title: { [key: string]: string };

  @IsObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(30)
  @ValidateNested({ each: true })
  readonly description: { [key: string]: InterviewDescription | null };

  @IsString({ message: 'ONLY_STRING' })
  @IsNotEmpty()
  readonly photo: string;
}

export class CreateInterviewContentBlockDto {
  @IsString({ message: 'ONLY_STRING' })
  readonly _id: string;
  @IsString({ message: 'ONLY_STRING' })
  type: string;
  content: any;
}

export class CreateInterviewDTO {
  @Transform(({ value }) =>
    plainToClass(CreateInterviewMainInfoDto, JSON.parse(value)),
  )
  @ValidateNested({ each: true })
  @Type(() => CreateInterviewMainInfoDto)
  mainInfo: CreateInterviewMainInfoDto;
  @Transform(({ value }) => {
    const values = JSON.parse(value);
    return values.map((item) => {
      return plainToClass(CreateInterviewContentBlockDto, item);
    });
  })
  @ValidateNested({ each: true })
  @Type(() => CreateInterviewContentBlockDto)
  @IsArray()
  @ArrayMinSize(1)
  contentBlocks: CreateInterviewContentBlockDto[];
}
