import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Messages from '../components/Messages';
import ChannelMessages from '../graphql/query/channelMessages';
import channelMessageSubscription from '../graphql/subscription/channelMessageSubscription';
import RenderMessage from './common/RenderMessage';

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
  subscribe = channelId => {
    // console.log(this.props.channelId);
    this.props.data.subscribeToMore({
      document: channelMessageSubscription,
      variables: {
        channelId: channelId
      },

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
      data: { loading, channelMessages },
      channelId
    } = this.props;
    if (loading) {
      return <p> Loading ...</p>;
    }

    return (
      <Messages>
        <RenderMessage messages={channelMessages} channelId={channelId} />
      </Messages>
    );
  }
}

export default graphql(ChannelMessages, {
  options: props => ({
    variables: {
      channelId: props.channelId
    },
    fetchPolicy: 'network-only'
  })
})(MessageContainer);
