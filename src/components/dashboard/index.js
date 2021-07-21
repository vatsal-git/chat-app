/* eslint-disable arrow-body-style */
import React from 'react';
import { Alert, Button, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { auth } from '../../misc/firebase';

const Dashboard = () => {
  const { profile } = useProfile();
  const onSignOut = () => {
    auth.signOut();
    Alert.info('Signed out', 4000);
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hello! {profile.name}</h3>
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
