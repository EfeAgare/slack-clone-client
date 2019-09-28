import gql from 'graphql-tag';

const DirectMessages = gql`
  query($workSpaceId: Int!, $otherUserId: Int!) {
    directMessages(workSpaceId: $workSpaceId, otherUserId: $otherUserId) {
      id
      text
      createdAt
      sender {
        id
        username
      }
    }
  }
`;

export default DirectMessages;
