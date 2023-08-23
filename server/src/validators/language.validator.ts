import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'dynamicLocaleLength', async: false })
export class DynamicLocaleLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(languages: any, args: ValidationArguments) {
    const [minLength] = args.constraints;

    for (const lang in languages) {
      if (languages.hasOwnProperty(lang)) {
        const value = languages[lang];
        if (typeof value !== 'string' || value.length < minLength) {
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `MIN_LENG-${args.property}`;
  }
}

export function DynamicLanguagesMinLength(
  minLength: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [minLength],
      validator: DynamicLocaleLengthConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'dynamicLocaleTypeConstraint', async: false })
export class DynamicLocaleTypeConstraint
  implements ValidatorConstraintInterface
{
  validate(languages: any) {
    for (const lang in languages) {
      if (languages.hasOwnProperty(lang)) {
        const value = languages[lang];
        if (typeof value !== 'string') {
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `ONLY_STRING-${args.property}`;
  }
}

export function DynamicLanguagesStringCheck(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DynamicLocaleTypeConstraint,
    });
  };
}
