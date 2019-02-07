import React from 'react';
import Snippet from '../Components/Snippet'
import {Collapsible} from 'react-materialize'

const SnippetContainer = ({snippets}) => (
  <div>
    <Collapsible>
      {snippets.map((snippet) => {
        return <Snippet snippet={snippet} />
      })}
    </Collapsible>
  </div>
);

export default SnippetContainer;
