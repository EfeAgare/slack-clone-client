import gql from 'graphql-tag';

const GetAllWorkSpaceMember = gql`
  query($workSpaceId: Int!) {
    getAllWorkSpaceMember(workSpaceId: $workSpaceId) {
      id
      username
    }
  }
`;

export default GetAllWorkSpaceMember;
