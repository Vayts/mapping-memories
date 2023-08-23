import React, { memo } from 'react';
import { ITitle } from '@src/components/UI/Title/types';
import { TitleItem } from './style';

const Title: React.FC<ITitle> = (props) => {
  const {
    fz,
    margin,
    padding,
    color,
    children,
    height,
    align,
    fw,
  } = props;
  return (
    <TitleItem fz={fz} margin={margin} color={color} height={height} align={align} fw={fw} padding={padding}>
      {children}
    </TitleItem>
  );
};

export default memo(Title);
