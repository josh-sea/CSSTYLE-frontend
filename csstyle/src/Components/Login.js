import React from 'react';
import { Row, Input, Col, Button} from 'react-materialize'

const Login = ({signIn, handleKeyPress, loginUsername, handleLoginUsername}) => (
  <Row>
    <Col s={12}>
      <Input value={loginUsername.username} onKeyPress={handleKeyPress} onChange={handleLoginUsername} s={12} label="Username" id="username" />
    </Col>
    <Col s={12}>
      <Button waves='purple' onClick={signIn}>Sign In</Button>
    </Col>
  </Row>
);

export default Login;
