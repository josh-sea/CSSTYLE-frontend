import React from 'react';
import Snippet from '../Components/Snippet'
import {Collapsible} from 'react-materialize'

const SnippetContainer = ({snippets}) => (
    <Collapsible popout defaultActiveKey={1}>
      {snippets.map((snippet) => {
        return <Snippet key={snippet.id} snippet={snippet} />
      })}
    </Collapsible>
);

export default SnippetContainer;
