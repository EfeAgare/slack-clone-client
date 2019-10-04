import gql from 'graphql-tag';

export const createChannelMutation = gql`
  mutation($workSpaceId: Int!, $name: String!, $public: Boolean) {
    createChannel(workSpaceId: $workSpaceId, name: $name, public: $public) {
      ok
      channel {
        id
        name
        public
      }  
    }
  }
`;

