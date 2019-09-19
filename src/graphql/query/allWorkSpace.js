import gql from 'graphql-tag';

const allWorkSpaceQuery = gql`
  {
    allWorkSpace {
      id
      name
      UserId
      channels {
        id
        name
      }
    }
    allInvitedWorkSpace {
      id
      name
      UserId
      channels {
        id
        name
      }
    }
  }
`;

export default allWorkSpaceQuery;
