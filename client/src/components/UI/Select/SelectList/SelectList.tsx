import React, { memo } from 'react';
import { SelectItem, SelectListWrapper, SelectNothingFound } from '@src/components/UI/Select/SelectList/style';
import { ISelectList } from '@src/components/UI/Select/SelectList/types';
import { useTranslation } from 'react-i18next';

const SelectList: React.FC<ISelectList> = ({ valueArr, inputValue, searchable, onClick, isOpen }) => {
  const { t } = useTranslation();
  
  const generateSearchOptions = () => {
    const sortArr = valueArr.filter((item) => t(item).toLowerCase().includes(inputValue.toLowerCase()));
    
    if (!sortArr.length) {
      return <SelectNothingFound data-testid='selectListNothingFound'>{t('nothingFound')}</SelectNothingFound>;
    }
    
    return (
      <>
        {sortArr.map((item) => {
          return (
            <SelectItem data-testid='selectListItem' onClick={onClick} key={`select${item}`} data-value={item}>{t(item)}</SelectItem>
          );
        })}
      </>
    );
  };
  
  const generateDefaultOptions = () => {
    return (
      <>
        {valueArr.map((item) => {
          return (
            <SelectItem data-testid='selectListItem' onClick={onClick} key={`select${item}`} data-value={item}>{t(item)}</SelectItem>
          );
        })}
      </>
    );
  };
  
  return (
    <SelectListWrapper data-testid="selectList" isOpen={isOpen}>
      {searchable ? generateSearchOptions() : generateDefaultOptions()}
    </SelectListWrapper>
  );
};

export default memo(SelectList);
