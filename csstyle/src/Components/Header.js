import React from 'react';
import {SideNav, SideNavItem, Button, Row, Col, Modal} from 'react-materialize'
import CreateSnippet from './CreateSnippet'

const Header = ({handleSubmit, handleChange, snippetForm}) => (
  <Row style={{background: '#333', height: '75px', padding:'15px'}}>
    <Col s={1}>
      <SideNav
        trigger={<Button icon='menu'></Button>}
        options={{ closeOnClick: true }}
        >
        <SideNavItem userView
          user={{
            background: 'img/office.jpg',
            image: 'img/yuna.jpg',
            name: 'John Doe',
            email: 'jdandturk@gmail.com'
          }}
        />
        <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
        <SideNavItem href='#!second'>Second Link</SideNavItem>
        <SideNavItem divider />
        <SideNavItem subheader>Subheader</SideNavItem>
        <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
      </SideNav>
    </Col>
    <Col s={3} offset={"s8"}>
      <Modal
        header='Modal Header'
        trigger={<Button> New Snippet</Button>}>
        <Row>
          <CreateSnippet snippetForm={snippetForm} handleChange={handleChange} handleSubmit={handleSubmit} />
        </Row>
      </Modal>
    </Col>
  </Row>
);

export default Header;
