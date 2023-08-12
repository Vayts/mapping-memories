import React, { memo } from 'react';
import { ICheckbox } from '@src/components/UI/Checkbox/types';
import * as S from './style';

const Checkbox: React.FC<ICheckbox> = (props) => {
  const {
    label,
    value,
    onChange,
    id,
    checked,
  } = props;
  return (
    <S.CheckboxWrapper
      checked={checked}
      htmlFor={id}
    >
      <S.CheckboxCustom checked={checked}>
        <span className='icon-done'/>
      </S.CheckboxCustom>
      <S.CheckboxText>{label}</S.CheckboxText>
      <S.CheckboxInput
        value={value}
        id={id}
        onChange={onChange}
      />
    </S.CheckboxWrapper>
  );
};

export default memo(Checkbox);
