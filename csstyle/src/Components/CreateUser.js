import React from 'react';
import { Row, Input, Col, Button} from 'react-materialize'

const CreateUser = ({handleRegister, loginUsername, handleLoginUsername}) => (
  <Row>
    <Col s={12}>
      <Input s={12}
        label="Username"
        onChange={handleLoginUsername}
        value={loginUsername.username}
        id="username"
      />
    </Col>
    <Col s={12}>
      <Input s={12}
        type="url"
        label="User Image"
        onChange={handleLoginUsername}
        value={loginUsername.image}
        id="user_image"
      />
    </Col>
    <Col s={12}>
      <Button onClick={handleRegister} waves='purple'>Create User</Button>
    </Col>
  </Row>
);

export default CreateUser;
