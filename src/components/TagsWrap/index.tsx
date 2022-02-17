import React, { useEffect, useRef, useState } from 'react';
import { getAstros } from '../../helpers';
import { Astros } from '../../models';
import AddTag from '../AddTag';
import Tag from '../Tag';
import './style.scss';

const TagsWrap = () => {
  const [tagNames, setTagNames] = useState<Set<string>>(new Set());
  const [astrosNames, setAstrosNames] = useState<Set<string>>(new Set());
  const [filteredAstrosNames, setFilteredAstrosNames] = useState<Set<string>>(new Set());
  const [filterString, setFilterString] = useState<string>('');

  const addTag = (tagName: string) => {
    const newTagNames = new Set(tagNames.values());
    newTagNames.add(tagName);

    setTagNames(newTagNames);
  };

  const removeTag = (tagName: string) => {
    const newTagNames = new Set(tagNames);
    newTagNames.delete(tagName);

    setTagNames(newTagNames);
  };

  const removeItemFromDropdown = (tagName: string) => {
    addTag(tagName);

    const newList = new Set(astrosNames);
    newList.delete(tagName);

    setAstrosNames(newList);
    setFilteredAstrosNames(newList);
  };

  const addItemToDropdown = (tagName: string) => {
    removeTag(tagName);

    const newList = new Set(astrosNames);
    newList.add(tagName);

    setAstrosNames(newList);

    if (tagName.search(RegExp(filterString, 'i')) > -1) {
      setFilteredAstrosNames(newList);
    }
  };

  const filterDropdown = (filterString: string) => {
    const matchers = new Set<string>();

    astrosNames.forEach((name) => {
      if (name.search(RegExp(filterString, 'i')) > -1) {
        matchers.add(name);
      }
    });

    setFilteredAstrosNames(matchers);
  };

  let isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    getAstros().then((astros: Astros) => {
      if (isMounted.current) {
        const astrosNames = new Set<string>();

        for (let astro of astros.people) {
          astrosNames.add(astro.name);
        }
  
        setAstrosNames(astrosNames);
        setFilteredAstrosNames(astrosNames);  
      }
    });

    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <div className="tags-wrap">
      {
        (() => {
          const tagNamesList: JSX.Element[] = [];
          tagNames.forEach(name => tagNamesList.push(<Tag key={name} name={name} addItemToDropdown={addItemToDropdown} />));

          return tagNamesList;
        })()
      }
      {
        tagNames.size > 0 || astrosNames.size > 0 ? (
          <AddTag filterString={filterString} setFilterString={setFilterString} filteredAstrosNames={filteredAstrosNames} removeItemFromDropdown={removeItemFromDropdown} filterDropdown={filterDropdown} />
        ) : (
          <div className="loader"><p className='sr-only'>Loading</p></div>
        )
      }
    </div>
  );
}

export default TagsWrap;
