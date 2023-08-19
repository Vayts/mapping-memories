import React, { memo, useCallback, useState } from 'react';
import { IInput } from '@src/components/UI/Input/types';
import { InputElem, InputElemWrapper, InputLabel, InputSecureIcon, InputWrapper } from '@src/components/UI/Input/style';

const Input: React.FC<IInput> = (props) => {
  const {
    type,
    height,
    padding,
    margin,
    fz,
    label,
    value,
    placeholder,
    isSecure,
    width,
    onChange,
    id,
    name,
    isValid,
    refValue,
    min,
    max,
    locale,
  } = props;
  const [show, setShow] = useState(false);

  const showHandler = useCallback(() => {
    setShow(!show);
  }, [show]);
	
  return (
    <InputWrapper margin={margin} width={width}>
      {label
        && (
          <InputLabel htmlFor={id} isValid={isValid !== undefined ? isValid : true}>
            {label as string}
          </InputLabel>
        )}
      <InputElemWrapper>
        <InputElem
          data-language={locale}
          data-testid='input'
          name={name}
          ref={refValue || null}
          onChange={onChange}
          value={value}
          placeholder={placeholder as string}
          type={isSecure && show ? 'text' : type || 'text'}
          height={height}
          padding={padding}
          isValid={isValid !== undefined ? isValid : true}
          fz={fz}
          id={id}
          aria-label={name}
          minLength={min}
          maxLength={max}
        />
        {isSecure && (
          <InputSecureIcon
            data-testid='secureIcon'
            className="icon-password"
            onMouseDown={showHandler}
            onMouseUp={showHandler}
            onTouchStart={showHandler}
            onTouchEnd={showHandler}
          />
        )}
      </InputElemWrapper>
    </InputWrapper>
  );
};

export default memo(Input);
