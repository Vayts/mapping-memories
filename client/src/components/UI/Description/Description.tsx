import React, { memo } from 'react';
import { IDescription } from '@src/components/UI/Description/types';
import { DescriptionItem } from './style';

const Description: React.FC<IDescription> = (props) => {
  const { fz, margin, color, height, align, children } = props;
  return (
    <DescriptionItem fz={fz} margin={margin} color={color} height={height} align={align} data-testid='description'>
      {children}
    </DescriptionItem>
  );
};

export default memo(Description);
