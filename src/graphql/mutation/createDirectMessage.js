import gql from 'graphql-tag';

export const createDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!, $workSpaceId: Int!) {
    createDirectMessage(
      receiverId: $receiverId
      text: $text
      workSpaceId: $workSpaceId
    )
  }
`;
