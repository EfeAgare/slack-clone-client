import gql from 'graphql-tag';

export const createMessageMutation = gql`
  mutation($channelId: Int!, $userId: Int!, $text: String!,) {
    createMessage(channelId: $channelId, userId: $userId, text: $text) {
      ok
      message {
        id
        channelId
        userId
        text
      }  
    }
  }
`;

