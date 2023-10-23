import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import {
  DynamicLanguagesMinLength,
  DynamicLanguagesStringCheck,
} from '../validators/language.validator';
import { TrimObjectKeys } from '../helper/pipeline.helper';

export class CreateMemorialTypeDto {
  @TrimObjectKeys()
  @IsNotEmptyObject()
  @DynamicLanguagesStringCheck()
  @DynamicLanguagesMinLength(4)
  @ValidateNested({ each: true })
  readonly name: { [key: string]: string };
}
