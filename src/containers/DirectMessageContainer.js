import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Messages from '../components/Messages';
import DirectMessages from '../graphql/query/directMessage';
import directMessageSubscription from '../graphql/subscription/directMessageSubscription';
import RenderMessage from './common/RenderMessage';

class DirectMessageContainer extends Component {

  state = {
    hasMoreItems: true,
  };
  componentWillMount() {
    this.unsubscribe = this.subscribe(
      parseInt(this.props.receiverId),
      this.props.workSpaceId
    );
  }

  componentWillReceiveProps({data: {directMessages}, receiverId, workSpaceId}) {
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

    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      this.props.data.directMessages &&
      directMessages &&
      this.props.data.directMessages.length !== directMessages.length
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
  subscribe = (receiverId, workSpaceId) => {
    this.props.data.subscribeToMore({
      document: directMessageSubscription,
      variables: {
        workSpaceId: workSpaceId,
        receiverId: receiverId
      },

      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data.displayDirectMessage) return prev;

        return {
          ...prev,
          directMessages: [subscriptionData.data.displayDirectMessage,
            ...prev.directMessages

          ]
        };
      }
    });
  };

  handleScroll=() => {

    const {data: {directMessages, fetchMore}, workSpaceId, receiverId} = this.props;
    if (
      this.scroller &&
      this.scroller.scrollTop < 100 &&
      this.state.hasMoreItems &&
      directMessages.length >= 35
    ) {
      fetchMore({
        variables: {
          workSpaceId: workSpaceId,
          otherUserId: parseInt(receiverId, 10),
          cursor: directMessages[directMessages.length - 1].createdAt,
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          if (fetchMoreResult.directMessages.length < 35) {
            this.setState({
              hasMoreItems: false
            });
          }

          return {
            ...previousResult,
            directMessages: [...previousResult.directMessages, ...fetchMoreResult.directMessages],
          };
        },
      });
    }

  }
  render() {
    const {data: {loading, directMessages}, workSpaceId, receiverId} = this.props;
    if (loading) {
      return <p> Loading ...</p>;
    }

    if (!directMessages) {
      return null;
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
        
        <RenderMessage
      messages={directMessages}
      workSpaceId={workSpaceId}
      receiverId={parseInt(receiverId, 10)}
      />
        </div>
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
