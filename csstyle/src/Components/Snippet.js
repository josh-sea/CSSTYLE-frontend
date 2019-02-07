import React from 'react';
import {CollapsibleItem, CardPanel, Row, Col, Tag} from 'react-materialize'
import SnippetHeader from './SnippetHeader'

const Snippet = ({snippet}) => (
  <CollapsibleItem onSelect={()=>{}} header={<SnippetHeader snippet={snippet}/>}>
    <Row>
      <Col s={4} offset={'s2'}>
        <CardPanel className="teal lighten-4 black-text show-code">
          <code>{snippet.html}</code>
        </CardPanel>
      </Col>
      <Col s={4}>
        <CardPanel className="teal lighten-4 black-text show-code">
          <code>{snippet.css}</code>
        </CardPanel>
      </Col>
    </Row>
  </CollapsibleItem>
);

export default Snippet;
