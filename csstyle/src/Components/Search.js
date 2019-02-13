import React from 'react';
import { Input, Row, Col } from 'react-materialize'

const Search = ({handleSearch, searchValue}) => (

  <Input onChange={handleSearch} value={searchValue} s={12} id="search" label="Find Tag" />

);

export default Search;
