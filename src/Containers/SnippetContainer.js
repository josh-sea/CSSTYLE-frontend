import React, { Fragment } from 'react';
import Snippet from '../Components/Snippet'
import { Collapsible, Row } from 'react-materialize'
import Search from '../Components/Search'

const SnippetContainer = ({snippets, user, updateSnippet, clickTag, searchValue, handleSearch, deleteSnippet}) => (
  <Fragment>
    <Row>
        <Search searchValue={searchValue} handleSearch={handleSearch}/>
    </Row>
    <Row>
      <Collapsible popout defaultActiveKey={1}>
        {snippets.map((snippet) => {
          return <Snippet clickTag={clickTag} key={snippet.id} deleteSnippet={deleteSnippet} snippet={snippet} updateSnippet={updateSnippet} user={user}/>
        })}
      </Collapsible>
    </Row>
  </Fragment>
);

export default SnippetContainer;
