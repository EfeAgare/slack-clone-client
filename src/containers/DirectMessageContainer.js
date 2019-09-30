import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import Messages from '../components/Messages';
import DirectMessages from '../graphql/query/directMessage';
import directMessageSubscription from '../graphql/subscription/directMessageSubscription';

class DirectMessageContainer extends Component {
  componentWillMount() {
    this.unsubscribe = this.subscribe(parseInt(this.props.receiverId), this.props.workSpaceId);
  }

  componentWillReceiveProps({ receiverId, workSpaceId }) {
    if (parseInt(this.props.receiverId) !== receiverId && this.props.workSpaceId !== workSpaceId ) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(parseInt(this.props.receiverId), workSpaceId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  subscribe = (receiverId, workSpaceId) => {
    this.props.data.subscribeToMore({
      document: directMessageSubscription,
      variables: {
        workSpaceId: workSpaceId,
        receiverId: receiverId
      },

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.displayDirectMessage) return prev;

        return {
          ...prev,
          directMessages: [
            ...prev.directMessages,
            subscriptionData.data.displayDirectMessage
          ]
        };
      }
    });
  };
  render() {
    const {
      data: { loading, directMessages }
    } = this.props;
    if (loading) {
      return <p> Loading ...</p>;
    }

    if (!directMessages) {
      return null;
    }

    return (
      <Messages>
        <Comment.Group>
          {directMessages.map(message => {
            return (
              <Comment key={message.id}>
                <Comment.Avatar
                  src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                  key={message.id}
                />
                <Comment.Content>
                  <Comment.Author as="a">
                    {message.sender.username}
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

export default graphql(DirectMessages, {
  
  options: props => ({

    variables: {
      workSpaceId: props.workSpaceId,
      otherUserId: parseInt(props.receiverId, 10)
    },
    fetchPolicy: 'network-only'
  })
})(DirectMessageContainer);
