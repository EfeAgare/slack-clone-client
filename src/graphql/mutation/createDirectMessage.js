import gql from 'graphql-tag';

export const createDirectMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!, $workSpaceId: Int!, $file: Upload) {
    createDirectMessage(
      receiverId: $receiverId
      text: $text
      workSpaceId: $workSpaceId
      file: $file
    )
  }
`;


// export const createDirectMessageUploadMutation = gql`
//   mutation($receiverId: Int!, $workSpaceId: Int!, $file: Upload) {
//     createDirectMessage(
//       receiverId: $receiverId
//       workSpaceId: $workSpaceId
//       file: $file
//     )
//   }
// `;