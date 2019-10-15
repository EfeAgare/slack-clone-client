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

  componentWillReceiveProps({data: {channelMessages}, channelId}) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }

    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      this.props.data.channelMessages &&
      channelMessages &&
      this.props.data.channelMessages.length !== channelMessages.length
    ) {
      // 35 items
      const heightBeforeRender = this.scroller.scrollHeight;
      // wait for 70 items to render
      setTimeout(() => {
        if (this.scroller) {
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

    const { data: { channelMessages, fetchMore }, channelId} = this.props;
    console.log(channelMessages[channelMessages.length - 1].createdAt)
    if (
      this.scroller &&
      this.scroller.scrollTop < 150 &&
      this.state.hasMoreItems &&
      channelMessages.length >= 35
    ) {
      fetchMore({
        variables: {
          channelId,
          cursor: channelMessages[channelMessages.length - 1].createdAt,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log(fetchMoreResult)
          if (!fetchMoreResult.channelMessages) {
            return previousResult.channelMessages;
          }
      
          if (fetchMoreResult.channelMessages.length < 35) {
            this.setState({
              hasMoreItems: false
            });
          }

          return {
            ...previousResult,
            channelMessages: [...previousResult.channelMessages, ...fetchMoreResult.channelMessages],
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
        <div ref={scroller => this.scroller = scroller} onScroll={this.handleScroll} style={{
        gridColumn: 3,
        gridRow: 2,
        paddingLeft: '20px',
        paddingRight: '20px',
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto',
      }}>
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
