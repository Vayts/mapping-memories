import { LANGUAGES } from '../constants/languages';

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
