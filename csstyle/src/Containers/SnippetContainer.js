import React from 'react';
import Snippet from '../Components/Snippet'
import {Collapsible} from 'react-materialize'

const SnippetContainer = ({snippets, user, updateSnippet, deleteSnippet}) => (
    <Collapsible popout defaultActiveKey={1}>
      {snippets.map((snippet) => {
        return <Snippet key={snippet.id} deleteSnippet={deleteSnippet} snippet={snippet} updateSnippet={updateSnippet} user={user}/>
      })}
    </Collapsible>
);

export default SnippetContainer;
