import React, {Fragment} from 'react';
import { SideNav, SideNavItem, Button } from 'react-materialize'
import CreateUser from './CreateUser'
import Login from './Login'

const Sidebar = ({currentuser, handleSubmit, handleChange, snippetForm, authenticated, toggleLoginForm, loginToggled, loginUsername, handleLoginUsername, signIn, handleRegister}) => (
  <SideNav
    trigger={<Button icon='menu'></Button>}
    options={{ closeOnClick: true }}
    >
    {!authenticated && <Button onClick={toggleLoginForm}>{loginToggled ? "Register" : "Login"}</Button>}
    {!loginToggled && !authenticated && <CreateUser handleRegister={handleRegister} loginUsername={loginUsername} handleLoginUsername={handleLoginUsername}/>}
    {loginToggled && !authenticated && <Login loginUsername={loginUsername} signIn={signIn} handleLoginUsername={handleLoginUsername} />}
    {authenticated && <Fragment>
    <SideNavItem userView
      user={{
        background: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        image: currentuser.user_image,
        name: currentuser.username
      }}
    />
    </Fragment>}
  </SideNav>
);

export default Sidebar;
