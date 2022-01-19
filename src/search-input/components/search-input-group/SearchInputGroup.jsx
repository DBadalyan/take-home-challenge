import './SearchInputGroup.css';

function SearchInputGroup({ group, children }) {
    return (
      <div className="SearchInputGroup">
         <h4 className="group-name">{group.name}</h4>
         <div className="group-items-wrapper">{children}</div>
      </div>
   );
}

export default SearchInputGroup;
