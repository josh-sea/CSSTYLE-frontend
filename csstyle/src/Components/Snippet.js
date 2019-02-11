import React from 'react';
import {CollapsibleItem, CardPanel, Row, Col} from 'react-materialize'
import SnippetHeader from './SnippetHeader'

const Snippet = ({snippet}) => (
  <CollapsibleItem onSelect={()=>{}} header={<SnippetHeader snippet={snippet}/>}>
    <Row>
      <Col s={4} offset={'s2'}>
        <CardPanel className="blue lighten-4 black-text show-code">
          <code className="codebox">{snippet.html}</code>
        </CardPanel>
      </Col>
      <Col s={4}>
        <CardPanel className="yellow lighten-4 black-text show-code">
          <code className="codebox">{snippet.css}</code>
        </CardPanel>
      </Col>
    </Row>
  </CollapsibleItem>
);

export default Snippet;
