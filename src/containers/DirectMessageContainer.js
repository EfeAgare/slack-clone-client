import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Messages from '../components/Messages';
import DirectMessages from '../graphql/query/directMessage';
import directMessageSubscription from '../graphql/subscription/directMessageSubscription';
import RenderMessage from './common/RenderMessage';

class DirectMessageContainer extends Component {
  componentWillMount() {
    this.unsubscribe = this.subscribe(
      parseInt(this.props.receiverId),
      this.props.workSpaceId
    );
    console.log("here")
  }

  componentWillReceiveProps({ receiverId, workSpaceId }) {
    if (
      parseInt(this.props.receiverId) !== receiverId &&
      this.props.workSpaceId !== workSpaceId
    ) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(
        parseInt(this.props.receiverId),
        workSpaceId
      );
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
      data: { loading, directMessages },
      workSpaceId,
      receiverId
    } = this.props;
    if (loading) {
      return <p> Loading ...</p>;
    }

    if (!directMessages) {
      return null;
    }

    return (
      <Messages>
        <RenderMessage
          messages={directMessages}
          workSpaceId={workSpaceId}
          receiverId={parseInt(receiverId, 10)}
        />
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
