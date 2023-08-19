import React, { memo } from 'react';
import { IErrorMsg } from '@src/components/UI/ErrorMsg/types';
import { ErrorMsgText, ErrorMsgWrapper } from '@src/components/UI/ErrorMsg/style';

const ErrorMsg: React.FC<IErrorMsg> = ({ show, margin, children, align }) => {
  return (
    <ErrorMsgWrapper margin={margin} data-testid='errorMsg'>
      {show && <ErrorMsgText align={align}>{children}</ErrorMsgText>}
    </ErrorMsgWrapper>
  );
};

export default memo(ErrorMsg);
