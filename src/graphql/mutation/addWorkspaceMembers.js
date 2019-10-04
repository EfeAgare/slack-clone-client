import gql from 'graphql-tag';

export const createWorkSpaceMemberMutation = gql`
  mutation($email: [String!], $workSpaceId: Int!, $url: String!) {
    createWorkSpaceMembers(email: $email, workSpaceId: $workSpaceId, url: $url) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

