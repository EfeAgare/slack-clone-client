import gql from 'graphql-tag';

const DirectMessages = gql`
  query($cursor: String, $workSpaceId: Int!, $otherUserId: Int!) {
    directMessages(cursor: $cursor, workSpaceId: $workSpaceId, otherUserId: $otherUserId) {
      id
      text
      createdAt
      path
      filename
      sender {
        username
      }
    }
  }
`;

export default DirectMessages;
