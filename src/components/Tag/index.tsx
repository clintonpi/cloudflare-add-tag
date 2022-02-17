import React, { FC } from 'react';
import './style.scss';

interface TagProps {
  name: string;
  addItemToDropdown: (tagName: string) => void;
}

const Tag: FC<TagProps> = ({ name, addItemToDropdown }) => {
  return (
    <div className='tag'>
      <span>{name}</span>
      <button className='tag__btn' title='Remove tag' onClick={() => addItemToDropdown(name)}>&times;</button>
    </div>
  );
}

export default Tag;
