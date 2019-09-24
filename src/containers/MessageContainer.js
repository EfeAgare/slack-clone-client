import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import Messages from '../components/Messages';
import ChannelMessages from '../graphql/query/channelMessages';
import channelMessageSubscription from '../graphql/subscription/channelMessageSubscription';

class MessageContainer extends Component {
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  subscribe = ({ channelId }) => {
    this.props.data.subscribeToMore({
      document: channelMessageSubscription,
      variables: { channelId },

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.newChannelMessage) return prev;

        return {
          ...prev,
          channelMessages: [
            ...prev.channelMessages,
            subscriptionData.data.newChannelMessage
          ]
        };
      }
    });
  };
  render() {
    const {
      data: { loading, channelMessages }
    } = this.props;
    if (loading) {
      return <p> Loading ...</p>;
    }

    return (
      <Messages>
        <Comment.Group>
          {channelMessages.map(message => {
            return (
              <Comment key={message.id}>
                <Comment.Avatar
                  src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                  key={message.id}
                />
                <Comment.Content>
                  <Comment.Author as="a">
                    {message.user.username}
                  </Comment.Author>
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
  }
}

export default graphql(ChannelMessages, {
  variables: props => ({
    channelId: props.channelId
  }),
  options: {
    fetchPolicy: 'network-only'
  }
})(MessageContainer);
