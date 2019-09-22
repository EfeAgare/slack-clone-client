import gql from 'graphql-tag';

export const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!,) {
    createMessage(channelId: $channelId, text: $text) {
      ok
    }
  }
`;

