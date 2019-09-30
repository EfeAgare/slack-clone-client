import gql from 'graphql-tag';

const channelMessageSubscription = gql`
  subscription($workSpaceId: Int!, $receiverId: Int!) {
    displayDirectMessage(workSpaceId: $workSpaceId, receiverId: $receiverId) {
      id
      text
      createdAt
      sender {
        username
      }
    }
  }
`;

export default channelMessageSubscription;
