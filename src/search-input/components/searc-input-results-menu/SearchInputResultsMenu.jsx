import { flatten } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { isDownKeyEvent, isEnterKeyEvent, isUpKeyEvent } from '../../../utils/keys.util';
import SearchInputGroupItem from '../search-input-group-item/SearchInputGroupItem';
import SearchInputGroup from '../search-input-group/SearchInputGroup';
import './SearchInputResultsMenu.css';

function SearchInputResultsMenu({ groups, onSelect }) {
const [activeGroupElement, setActiveGroupElement] = useState(null);
    const activGroupItemIndex = useRef(-1);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    useEffect(() => {
        activGroupItemIndex.current = -1;
    }, [groups]);

    function getAllGroupItems() {
        return flatten(groups.map(({ items }) => items));
    }

    function handleKeyDown(e) {
        if (isUpKeyEvent(e) || isDownKeyEvent(e)) {
            e.preventDefault();
            const _groupItems = getAllGroupItems();
            if (isUpKeyEvent(e)) {
                if (activGroupItemIndex.current === 0) {
                    activGroupItemIndex.current = _groupItems.length - 1;
                } else {
                    activGroupItemIndex.current--;
                }
            } else if (isDownKeyEvent(e)) {
                if (activGroupItemIndex.current === _groupItems.length - 1) {
                    activGroupItemIndex.current = 0;
                } else {
                    activGroupItemIndex.current++;
                }
            }
            setActiveGroupElement(_groupItems[activGroupItemIndex.current]);
        } else if (isEnterKeyEvent(e)) {
            onSelect(getAllGroupItems()[activGroupItemIndex.current]);
        }
    }

    function getGroups() {
        return groups.map(group => (
            <SearchInputGroup key={group.id} group={group}>
                {getGroupItems(group)}
            </SearchInputGroup>
        ));
    }

    function getGroupItems(group) {
        return group.items.map(item => (
            <SearchInputGroupItem
                key={item.id}
                item={item}
                focused={activeGroupElement === item}
                onSelect={onSelect}
                onSelectActive={selectedItem => {
                    setActiveGroupElement(selectedItem);
                    activGroupItemIndex.current = getAllGroupItems().findIndex(
                        _item => _item === selectedItem
                    );
                }}
            ></SearchInputGroupItem>
        ));
    }

    return <div className="SearchInputResultsMenu">{getGroups()}</div>;
}

export default SearchInputResultsMenu;
