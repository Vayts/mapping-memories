import React from 'react';
import { ISanitizeHTMLProps } from '@src/components/SanitizeHTML/types';
import * as DOMPurify from 'dompurify';

const SanitizeHTML: React.FC<ISanitizeHTMLProps> = ({ html }) => {
  const clean = DOMPurify.sanitize(html, { ADD_TAGS: ['a'], ADD_ATTR: ['href', 'target'] });
  
  return (
    <div
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

export default SanitizeHTML;
