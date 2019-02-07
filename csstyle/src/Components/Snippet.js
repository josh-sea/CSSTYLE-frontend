import React from 'react';
import {CollapsibleItem, CardPanel, Row, Col} from 'react-materialize'

const Snippet = ({snippet}) => (
  <CollapsibleItem header={snippet.name}>
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
