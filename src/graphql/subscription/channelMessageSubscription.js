import gql from 'graphql-tag';

const channelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      createdAt
      user {
        username
      }
    }
  }
`;

export default channelMessageSubscription;
