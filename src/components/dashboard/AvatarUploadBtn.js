import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Alert, Button, Modal } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { getUserUpdates } from '../../misc/helpers';
import ProfileAvatar from './ProfileAvatar';

const fileInputTypes = '.png,.jpeg,.jpg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

const isValidFile = file => acceptedFileTypes.includes(file.type);

const getBlob = canvas =>
  new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File process error'));
      }
    });
  });

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);
  const { profile } = useProfile();
  const avatarEditorRef = useRef();

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValidFile(file)) {
        open();

        setImg(file);
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const updates = await getUserUpdates(
        profile.uid,
        'avatar',
        downloadUrl,
        database
      );

      await database.ref().update(updates);

      setIsLoading(false);
      Alert.info('Avatar is uploaded', 4000);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        className="height-200 width-200 img-fullsize font-huge"
        src={profile.avatar}
        name={profile.name}
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                />
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              disabled={isLoading}
              onClick={onUploadClick}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
