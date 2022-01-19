import { useEffect, useRef } from 'react';
import './SearchInputGroupItem.css';

export function SearchInputGroupItem({
    item,
    focused,
    onSelect,
    onSelectActive
}) {
    const groupItemElement = useRef(null);

    useEffect(() => {
        if (focused) {
            onSelectActive(item);
            groupItemElement.current?.scrollIntoView({ block: 'nearest' });
            groupItemElement.current?.focus();
        }
    }, [focused]);

    return (
        <div className="SearchInputGroupItem">
            <div
                className={`group-item-name ${focused ? 'active' : ''}`}
                tabIndex={0}
                ref={groupItemElement}
                onClick={() => onSelect(item)}
                onMouseOver={() => onSelectActive(item)}
                onFocus={() => onSelectActive(item)}
                onMouseLeave={() => onSelectActive(null)}
            >
                {item.name}
            </div>
        </div>
    );
}

export default SearchInputGroupItem;