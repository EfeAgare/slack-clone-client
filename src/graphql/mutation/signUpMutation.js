import gql from 'graphql-tag';

export const SignUpMutation = gql`
  mutation($username: String!, $email: String!, $password: String!, $token: String) {
    register(username: $username, email: $email, password: $password, token: $token) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;