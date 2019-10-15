import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Messages from '../components/Messages';
import ChannelMessages from '../graphql/query/channelMessages';
import channelMessageSubscription from '../graphql/subscription/channelMessageSubscription';
import RenderMessage from './common/RenderMessage';

class MessageContainer extends Component {

  state = {
    hasMoreItems: true,
  };
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({data: {messages}, channelId}) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }

    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      this.props.data.messages &&
      messages &&
      this.props.data.messages.length !== messages.length
    ) {
      // 35 items
      const heightBeforeRender = this.scroller.scrollHeight;
      // wait for 70 items to render
      setTimeout(() => {
        if(this.scroller){
          this.scroller.scrollTop = this.scroller.scrollHeight - heightBeforeRender;
        }
      }, 120);
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

      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data.newChannelMessage) return prev;

        return {
          ...prev,
          channelMessages: [subscriptionData.data.newChannelMessage,
            ...prev.channelMessages

          ]
        };
      }
    });
  };

  handleScroll=() => {
    const {data: {messages, fetchMore}, channelId} = this.props;
    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      this.state.hasMoreItems &&
      messages.length >= 35
    ) {
      fetchMore({
        variables: {
          channelId,
          cursor: messages[messages.length - 1].created_at,
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          if (fetchMoreResult.messages.length < 35) {
            this.setState({
              hasMoreItems: false
            });
          }

          return {
            ...previousResult,
            messages: [...previousResult.messages, ...fetchMoreResult.messages],
          };
        },
      });
    }

  }
  render() {
    const {data: {loading, channelMessages}, channelId} = this.props;
    if (loading) {
      return <p> Loading ...</p>;
    }

    return (
      <Messages>
        <div ref={scroller => this.scroller = scroller} onScroll={this.handleScroll}>
        <RenderMessage messages={channelMessages} channelId={channelId} />
        </div>
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
