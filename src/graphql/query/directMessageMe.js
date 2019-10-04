import gql from 'graphql-tag';

const directMessageMeQuery = gql`
  query($userId: Int!) {
    getUser(userId: $userId) {
      username
    }
    
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
  }
`;

export default directMessageMeQuery;
