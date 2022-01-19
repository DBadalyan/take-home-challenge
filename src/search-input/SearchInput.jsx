import { isEmpty } from 'lodash-es';
import { useMemo, useState } from 'react';
import { search } from '../API';
import SearchInputResultsMenu from './components/searc-input-results-menu/SearchInputResultsMenu';
import './SearchInput.css';
import { groupSearchResults } from './utils/group-search-results.util';

function SearchInput({ onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const groups = useMemo(
        () => groupSearchResults(search(searchTerm)),
        [searchTerm]
    );

    function resetSearchResults() {
        setSearchTerm('');
    }

    function hasResults() {
        return !isEmpty(groups);
    }

    return (
    <div className="SearchInput">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        autoFocus
        onChange={e => setSearchTerm(e.target.value)}
      />
      {hasResults() && (
        <SearchInputResultsMenu
          groups={groups}
          onSelect={selectedItem => {
            onSelect(selectedItem);
            resetSearchResults();
          }}
        ></SearchInputResultsMenu>
      )}
    </div>
  );
}

export default SearchInput;