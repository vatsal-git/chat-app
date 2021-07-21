/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { auth, database } from '../../misc/firebase';
import EditableInput from '../EditableInput';

const Dashboard = () => {
  const { profile } = useProfile();
  const onSignOut = () => {
    auth.signOut();
    Alert.info('Signed out', 4000);
  };

  const onSave = async newData => {
    const userNicknameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child('name');

    try {
      await userNicknameRef.set(newData);
      Alert.success('Nickname updated');
    } catch (err) {
      Alert.error(err.message);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hello! {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
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
