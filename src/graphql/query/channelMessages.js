import gql from 'graphql-tag';

const ChannelMessages = gql`
  query($cursor: String, $channelId: Int!) {
    channelMessages(cursor: $cursor, channelId: $channelId) {
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
