import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

function CategoriesSection({ selectedCategory, onCategoryClick }) {
  const { threads } = useSelector((state) => state);
  const [searchTerms, setSearchTerms] = useState('');

  const allCategories = [...new Set(threads.map((thread) => thread.category))];

  const filteredCategories = allCategories.filter((category) =>
    category.toLowerCase().includes(searchTerms.toLowerCase())
  );

  return (
    <>
      <div className="categories__container">
        <div className="categories__header">
          <h4>Kategori</h4>
          <SearchBar
            searchValue={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </div>
        <div className="categories__list">
          {filteredCategories.map((category, index) => (
            <div
              key={index}
              className={`categories__item ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </div>
          ))}
          <div
            className={`categories__item ${
              selectedCategory === null ? 'active' : ''
            }`}
            onClick={() => onCategoryClick(null)}
          >
            Semua
          </div>
        </div>
      </div>
    </>
  );
}

CategoriesSection.propTypes = {
  selectedCategory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null])
  ]),
  onCategoryClick: PropTypes.func.isRequired,
};

export default CategoriesSection;
