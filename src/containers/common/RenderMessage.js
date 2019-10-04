import React from 'react';

import { Comment, Image } from 'semantic-ui-react';

import FileUpload from '../../components/FileUpload';

const RenderMessage = ({ messages, workSpaceId, channelId, receiverId }) => {
  return (
    <FileUpload
      disabledClick={true}
      workSpaceId={workSpaceId}
      channelId={channelId}
      receiverId={receiverId}
    >
      <Comment.Group>
        {messages.map(message => {
          return (
            <Comment key={message.id}>
              <Comment.Avatar
                src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                key={message.id}
              />
              <Comment.Content>
                {message.user ? (
                  <Comment.Author as="a">
                    {message.user.username}
                  </Comment.Author>
                ) : (
                  <Comment.Author as="a">
                    {message.sender.username}
                  </Comment.Author>
                )}

                <Comment.Metadata>
                  <div>{message.createdAt}</div>
                </Comment.Metadata>
                {message.text ? (
                  <Comment.Text>{message.text}</Comment.Text>
                ) : (
                  <Comment.Text>
                    {message.filename}
                    <Image src={`${message.path}`} size="small" />
                  </Comment.Text>
                )}

                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        })}
      </Comment.Group>
    </FileUpload>
  );
};

export default RenderMessage;
