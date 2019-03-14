import React from 'react';
import { Input } from 'react-materialize'

const Search = ({handleSearch, searchValue}) => (

  <Input onChange={handleSearch} value={searchValue} s={12} id="search" label="Find Tag" />

);

export default Search;
