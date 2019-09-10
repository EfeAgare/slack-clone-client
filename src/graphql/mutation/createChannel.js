import gql from 'graphql-tag';

export const createChannelMutation = gql`
  mutation($workSpaceId: Int!, $name: String!) {
    createChannel(workSpaceId: $workSpaceId, name: $name)
  }
`;

