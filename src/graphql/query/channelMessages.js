import gql from 'graphql-tag';

const ChannelMessages = gql`
  query($channelId: Int!) {
    channelMessages(channelId: $channelId) {
      id
      text
      createdAt
      path
      filename
      user {
        username
      }
    }
  }
`;

export default ChannelMessages;
