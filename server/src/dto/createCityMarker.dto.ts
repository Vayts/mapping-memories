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
import { TrimObjectKeys } from '../helper/pipeline.helper';

export class CreateCityMarkerDto {
  @TrimObjectKeys()
  @IsNotEmptyObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(2)
  @ValidateNested({ each: true })
  readonly name: { [key: string]: string };

  @IsNumber()
  @Min(-90, { message: 'least -90' })
  @Max(90, { message: 'at most 90' })
  readonly lat: number;

  @IsNumber()
  @Min(-90, { message: 'least -90' })
  @Max(90, { message: 'at most 90' })
  readonly lng: number;
}
