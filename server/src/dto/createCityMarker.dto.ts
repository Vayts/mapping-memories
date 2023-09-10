import {
  IsNotEmptyObject,
  IsNumber,
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

export class CreateCityMarkerDto {
  @Transform(({ value }) => JSON.parse(value))
  @TrimObjectKeys()
  @IsNotEmptyObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(2)
  @ValidateNested({ each: true })
  readonly name: { [key: string]: string };

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
