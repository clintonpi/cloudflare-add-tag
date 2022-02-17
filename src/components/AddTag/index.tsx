import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import './style.scss';

interface AddTagProps {
  filterString: string;
  setFilterString: Dispatch<SetStateAction<string>>;
  filteredAstrosNames: Set<string>;
  removeItemFromDropdown: (tagName: string) => void;
  filterDropdown: (filterString: string) => void;
}

const AddTag: FC<AddTagProps> = ({ filterString, setFilterString, filteredAstrosNames, removeItemFromDropdown, filterDropdown }) => {
  const handleFilter = (e: ChangeEvent) => {
    const inputValue = (e.target as HTMLInputElement).value;

    setFilterString(inputValue);
    filterDropdown(inputValue);
  };

  const handleDropdownSelect = (tagName: string) => {
    setFilterString('');
    filterDropdown('');
    removeItemFromDropdown(tagName);
  };

  const formatText = (text: string) => {
    const filterStringIndices: Set<number> = new Set();

    Array.from(text.matchAll(RegExp(filterString, 'gi')))
      .forEach((arr) => {
        if (arr.index || arr.index === 0) filterStringIndices.add(arr.index);
      });

    const formattedTextChars = [];

    for (let i = 0; i < text.length; i++) {
      if (filterStringIndices.has(i)) {
        formattedTextChars.push(`<span class='filter-text'>${text.slice(i, i + filterString.length)}</span>`);
        i += filterString.length - 1;
      } else {
        formattedTextChars.push(text[i]);
      }
    }

    return formattedTextChars.join('');
  };

  const generateDropdownList = () => {
    const dropdownList: JSX.Element[] = [];

    filteredAstrosNames.forEach((name) => {
      if (filterString.length > 0) {
        dropdownList.push(
          <li key={name}>
            <button
              className='add-tag__list__button add-tag__list__button--filtered'
              onClick={() => handleDropdownSelect(name)}
              dangerouslySetInnerHTML={
                {
                  __html: formatText(name)
                }
              }
            ></button>
          </li>
        );

        return;
      }

      dropdownList.push(
        <li key={name}>
          <button className='add-tag__list__button' onClick={() => handleDropdownSelect(name)}>{name}</button>
        </li>
      );
    });

    return dropdownList;
  };

  return (
    <div className='add-tag'>
      <label htmlFor="add-tag__input" className='sr-only'>Add tag</label>
      <input type='text' value={filterString} placeholder='+ Add tag' autoFocus id='add-tag__input' className='add-tag__input' onChange={handleFilter} />
      <ul className='add-tag__list'>
        { generateDropdownList() }
      </ul>
    </div>
  );
}

export default AddTag;
