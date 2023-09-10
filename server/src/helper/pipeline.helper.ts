import { LANGUAGES } from '../constants/languages';
import { Transform, TransformationType } from 'class-transformer';

export function generateSearchPipeline(search: string): any[] {
  let searchPipeline = [];

  if (search) {
    searchPipeline = [
      {
        $addFields: {
          titleAllLanguages: {
            $concat: LANGUAGES.map((language) => `$title.${language}`).filter(
              (field) => field,
            ),
          },
          descriptionAllLanguages: {
            $concat: LANGUAGES.map(
              (language) => `$description.${language}`,
            ).filter((field) => field),
          },
        },
      },
      {
        $match: {
          $or: [
            {
              titleAllLanguages: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              descriptionAllLanguages: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        },
      },
    ];
  }

  return searchPipeline;
}

function trimString(value: string): string {
  return typeof value === 'string' ? value.trim() : value;
}

export function TrimObjectKeys() {
  return Transform(({ value, type }) => {
    if (type === TransformationType.PLAIN_TO_CLASS) {
      if (typeof value === 'object') {
        const trimmedObject: { [key: string]: string } = {};
        for (const prop in value) {
          if (Object.prototype.hasOwnProperty.call(value, prop)) {
            trimmedObject[prop] = trimString(value[prop]);
          }
        }
        return trimmedObject;
      }
    }
    return value;
  });
}
