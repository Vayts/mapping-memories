import React, { useCallback } from 'react';
import { ISearch } from '@src/components/UI/Search/types';
import { useTranslation } from 'react-i18next';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

export const Search: React.FC<ISearch> = (props) => {
  const {
    id,
    margin,
    height,
    name,
    onSearch,
    onChange,
    placeholder,
    refValue,
    value,
    width,
    isLoading,
    fz,
    disabled,
  } = props;
  const { t } = useTranslation();
  
  const onSearchHandler = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    
    if (!isLoading && !disabled) {
      onSearch(value);
    }
  }, [isLoading]);
  
  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        if (!isLoading && !disabled) {
          onSearch(value);
        }
      }
    },
    [onSearch, value, isLoading],
  );
	
  return (
    <S.SearchWrapper
      height={height}
      margin={margin}
    >
      <S.SearchElem
        height={height}
        width={width}
        fz={fz}
        htmlFor={id}
      >
        <S.SearchInput
          value={value}
          onChange={onChange}
          placeholder={placeholder || t('search')}
          ref={refValue}
          name={name}
          id={id}
          onKeyDown={onKeyDownHandler}
          disabled={disabled}
        />
      </S.SearchElem>
      <S.SearchButton
        height={height}
        width={width}
        onClick={onSearchHandler}
        disabled={disabled}
      >
        {isLoading ? <Loader size={15}/> : (
          <S.SearchIcon
            className='icon-search'
          />
        )}
      </S.SearchButton>
    </S.SearchWrapper>
  );
};
