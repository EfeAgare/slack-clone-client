import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { graphql, compose } from 'react-apollo';
import { createDirectMessageMutation } from '../graphql/mutation/createDirectMessage';
import { createMessageMutation } from '../graphql/mutation/createMessageMutation';
const FileUpload = ({
  children,
  disabledClick,
  channelId,
  receiverId,
  workSpaceId,
  mutate
}) => {
  const onDrop = useCallback(
    async file => {
      let res;
      if ((receiverId && workSpaceId) !== undefined) {
        res = await mutate({
          variables: {
            receiverId: receiverId,
            file: file,
            workSpaceId: workSpaceId
          }
        });
      } else {
        res = await mutate({
          variables: {
            channelId: channelId,
            file: file[0]
          }
        });
      }
      console.log(res);
    },

    [channelId, mutate, receiverId, workSpaceId]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: disabledClick
  });

  return (
    <div {...getRootProps()} style={{ outline: 'none' }}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default compose(
  graphql(createDirectMessageMutation),
  graphql(createMessageMutation)
)(FileUpload);
