import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import {
  DynamicLanguagesMinLength,
  DynamicLanguagesStringCheck,
} from '../validators/language.validator';
import { Transform } from 'class-transformer';
import { TrimObjectKeys } from '../helper/pipeline.helper';

export class CreateMemorialTypeDto {
  @Transform(({ value }) => JSON.parse(value))
  @TrimObjectKeys()
  @IsNotEmptyObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(4)
  @ValidateNested({ each: true })
  readonly name: { [key: string]: string };
}
