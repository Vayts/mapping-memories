import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ISelect } from '@src/components/UI/Select/types';
import {
  SelectElemWrapper,
  SelectIcon, SelectIconClear,
  SelectIconsWrapper, SelectInput,
  SelectLabel, SelectPlaceholder, SelectSeparator, SelectValue,
  SelectWrapper,
} from '@src/components/UI/Select/style';
import { useOutsideClick } from '@src/hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';
import SelectList from '@src/components/UI/Select/SelectList/SelectList';

const Select: React.FC<ISelect> = (props) => {
  const {
    onChange,
    width,
    height,
    id,
    isValid,
    margin,
    fz,
    padding,
    selected,
    placeholder,
    searchable,
    valueArr,
    label,
    isNotDeletable,
  } = props;
  const [isOpen, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const selectRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const current = inputRef.current as HTMLInputElement;
      current.focus();
    }
    if (!isOpen) {
      setInputValue('');
    }
  }, [isOpen]);
  
  const toggleSelect = () => {
    setOpen(!isOpen);
  };
  
  const closeSelect = () => {
    setOpen(false);
    setInputValue('');
  };
  
  const changeHandler = useCallback((e: any) => {
    const value = e.currentTarget.dataset.value;
    if (value) {
      onChange(value);
      closeSelect();
    }
  }, [valueArr]);
  
  const clearHandler = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  }, []);
  
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const generateElemContent = () => {
    if (searchable) {
      return (
        <>
          {!inputValue
            && (
              <SelectValue>
                {t(selected)}
              </SelectValue>
            )}
          {isOpen && <SelectInput data-testid='selectInput' ref={inputRef} value={inputValue} onChange={changeInputHandler}/>}
        </>
      );
    }
    return (
      <SelectValue>
        {t(selected)}
      </SelectValue>
    );
  };
  
  const generateIcons = useCallback(() => {
    return (
      <SelectIconsWrapper>
        {!isNotDeletable && selected && (
          <>
            <SelectIconClear className='icon-cross' onClick={clearHandler}/>
            <SelectSeparator>|</SelectSeparator>
          </>
        )}
        {isOpen ? <SelectIcon className='icon-up' isOpen={isOpen}/> : <SelectIcon className='icon-down' isOpen={isOpen}/>}
      </SelectIconsWrapper>
    );
  }, [selected, isOpen]);
  
  useOutsideClick(selectRef, closeSelect);
  
  return (
    <SelectWrapper margin={margin} width={width} ref={selectRef} data-testid='selectWrapper'>
      {label && <SelectLabel data-testid='selectLabel' htmlFor={id} isValid={isValid !== undefined ? isValid : true}>{label as string}</SelectLabel>}
      <SelectElemWrapper
        data-testid='select'
        padding={padding}
        height={height}
        isValid={isValid !== undefined ? isValid : true}
        onClick={toggleSelect}
        isOpen={isOpen}
      >
        {!selected && !inputValue && placeholder && <SelectPlaceholder fz={fz}>{placeholder as string}</SelectPlaceholder>}
        {generateElemContent()}
        {generateIcons()}
      </SelectElemWrapper>
      {isOpen && (
        <SelectList
          isOpen={isOpen}
          onClick={changeHandler}
          valueArr={valueArr}
          inputValue={inputValue}
          searchable={searchable}
        />
      )}
    </SelectWrapper>
  );
};

export default memo(Select);
