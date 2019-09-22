import React from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import Messages from '../components/Messages';
import ChannelMessages from '../graphql/query/channelMessages';

const Message = ({ data: { loading, channelMessages } }) => {
  if (loading) {
    return <p> Loading ...</p>;
  }
  console.log(channelMessages);
  return (
    <Messages>
      <Comment.Group>
        {channelMessages.map(message => {
          return (
            <Comment key={message.id}>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" key={message.id} />
              <Comment.Content>
                <Comment.Author as="a">{message.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{message.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        })}
      </Comment.Group>
    </Messages>
  );
};

export default graphql(ChannelMessages, {
  variables: props => ({
    channelId: props.channelId
  })
})(Message);
