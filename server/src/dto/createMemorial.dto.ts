import {
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  DynamicLanguagesMinLength,
  DynamicLanguagesStringCheck,
} from '../validators/language.validator';
import { Transform } from 'class-transformer';
import { TrimObjectKeys } from '../helper/pipeline.helper';

export class CreateMemorialDto {
  @Transform(({ value }) => JSON.parse(value))
  @TrimObjectKeys()
  @IsNotEmptyObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(5)
  @ValidateNested({ each: true })
  readonly title: { [key: string]: string };

  @Transform(({ value }) => JSON.parse(value))
  @TrimObjectKeys()
  @IsNotEmptyObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(30)
  @ValidateNested({ each: true })
  readonly description: { [key: string]: string };

  @Transform(({ value }) => JSON.parse(value))
  @TrimObjectKeys()
  @IsNotEmptyObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(10)
  @ValidateNested({ each: true })
  readonly address: { [key: string]: string };

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsString({ message: 'ONLY_STRING' })
  readonly photo: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsString({ message: 'ONLY_STRING' })
  readonly link: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsString({ message: 'ONLY_STRING' })
  readonly city_id: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsString({ message: 'ONLY_STRING' })
  readonly type_id: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsString({ message: 'ONLY_STRING' })
  readonly photo_source: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsString({ message: 'ONLY_STRING' })
  readonly icon: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(-90, { message: 'least -90' })
  @Max(90, { message: 'at most 90' })
  readonly lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(-90, { message: 'least -90' })
  @Max(90, { message: 'at most 90' })
  readonly lng: number;
}
