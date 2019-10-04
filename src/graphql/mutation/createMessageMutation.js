import gql from 'graphql-tag';

export const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String, $file: Upload) {
    createMessage(channelId: $channelId, text: $text, file: $file) {
      ok
    }
  }
`;

// export const createChannelUploadMutation = gql`
//   mutation($channelId: Int!, $file: Upload) {
//     createMessage(channelId: $channelId, file: $file) {
//       ok
//     }
//   }
// `;

