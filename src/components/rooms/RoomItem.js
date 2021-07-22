import React from 'react';
import TimeAgo from 'timeago-react';

// eslint-disable-next-line arrow-body-style
const RoomItem = ({ room }) => {
  const { createdAt, name } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-normal text-black-45"
        />
      </div>

      <div className="dispaly-flex align-items-center text-black-70">
        <span>No messges ...</span>
      </div>
    </div>
  );
};

export default RoomItem;
