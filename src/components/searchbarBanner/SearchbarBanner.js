import React from 'react'
import Search from '../search/search'

const SearchbarBanner = ({ title, searchValue, handleOnChange = {} }) => {
   return (
      <div className="search-banner">
         <h3>{title}</h3>
         <Search value={searchValue} onChange={handleOnChange} />
      </div>
   )
}

export default SearchbarBanner
