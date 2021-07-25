import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInfoBtnModal = ({ profile }) => {
  const { isOpen, open, close } = useModalState();

  const { name, avatar, createdAt } = profile;

  const shortName = name.split(' ')[0];
  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button onClick={open}>{shortName}</Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            className="height-200 width-200 img-fullsize font-huge"
            src={avatar}
            name={name}
          />
          <h4 className="mt-2">{name}</h4>
          <p>Member since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
