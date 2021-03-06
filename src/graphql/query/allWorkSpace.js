import gql from 'graphql-tag';

const allWorkSpaceQuery = gql`
  {
    allWorkSpace {
      id
      name
      UserId
      directMessageMembers {
        id
        username
      }
      channels {
        id
        name
        public
      }
    }
    # allInvitedWorkSpace {
    #   id
    #   name
    #   UserId
    #   directMessageMembers {
    #     id
    #     username
    #   }
    #   channels {
    #     id
    #     name
    #   }
    # }
  }
`;

export default allWorkSpaceQuery;
