import React from 'react';
import Snippet from '../Components/Snippet'
import {Collapsible} from 'react-materialize'

const SnippetContainer = ({snippets, user}) => (
    <Collapsible popout defaultActiveKey={1}>

      {snippets.map((snippet) => {
        return <Snippet key={snippet.id} snippet={snippet} user={user}/>
      })}
    </Collapsible>
);

export default SnippetContainer;
