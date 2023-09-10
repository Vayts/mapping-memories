import React, { memo } from 'react';
import { Loader } from '@src/components/Loader/Loader';
import { IButton } from '@src/components/UI/Button/types';
import { ButtonContent, ButtonIcon, ButtonItem, ButtonText } from '@src/components/UI/Button/style';

const Button: React.FC<IButton> = (props) => {
  const {
    margin,
    padding,
    text,
    height,
    width,
    fz,
    styleType,
    fw,
    disabled,
    clickHandler,
    isLoading,
    icon,
    br,
    type,
  } = props;
  
  return (
    <ButtonItem
      width={width}
      margin={margin}
      padding={padding}
      height={height}
      fz={fz}
      styleType={styleType}
      fw={fw}
      onClick={(e) => clickHandler(e)}
      disabled={disabled || isLoading}
      br={br}
      type={type || 'button'}
      isLoading={isLoading}
    >
      <ButtonContent>
        {isLoading && <Loader size={15}/>}
        {icon && (
          <ButtonIcon
            isLoading={isLoading}
            fz={fz}
            className={icon}
          />
        )}
        {text && <ButtonText isLoading={isLoading}>{text as string}</ButtonText>}
      </ButtonContent>
    </ButtonItem>
  );
};

export default memo(Button);
