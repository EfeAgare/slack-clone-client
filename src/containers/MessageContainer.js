import Messages from '../components/Messages';
import React from 'react';

const Message = ({ channelId }) => {
  return (
    <Messages channelId={channelId}>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
  );
};

export default Message;
