import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ searchValue, onChange }) {
  return (
    <>
      <div>
        <input
          className="search-bar__container"
          type="text"
          value={searchValue}
          onChange={onChange}
          placeholder="Search"
        />
      </div>
    </>
  );
}

SearchBar.propTypes = {
  searchValue: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchBar;
