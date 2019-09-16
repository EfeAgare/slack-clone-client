import gql from 'graphql-tag';

export const CreateWorkSpaceMutation = gql`
  mutation($name: String!) {
    createWorkSpace(name: $name) {
      ok
      workSpace {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;