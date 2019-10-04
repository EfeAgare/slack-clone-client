import React from 'react';
import styled from 'styled-components';
import { Input, Button, Icon } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose } from 'react-apollo';

import FileUpload from './FileUpload';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 4;
  margin: 20px;
  display: grid;
  grid-template-columns: 5% auto;
`;

const ENTER_KEY = 13;
const sendMessage = ({
  name,
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  channelId,
  receiverId,
  workSpaceId
}) => (
  <SendMessageWrapper>
    <FileUpload
      channelId={channelId}
      receiverId={receiverId}
      workSpaceId={workSpaceId}
    >
      <Button icon style={{ margin: 'unset', borderRadius: 'unset' }}>
        <Icon name="attach" />
      </Button>
    </FileUpload>
    <Input
      placeholder={name ? `Message  ${name}` : `Message  #${channelName}`}
      name="message"
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.message}
      onKeyDown={e => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
    />
  </SendMessageWrapper>
);

export default compose(
  withFormik({
    mapPropsToValues: () => ({ message: '' }),

    handleSubmit: async (
      values,
      { setSubmitting, resetForm, props: { onSubmit } }
    ) => {
      if (!values.message && !values.message.trim()) {
        setSubmitting(false);
        return;
      }
      await onSubmit(values.message);
      setSubmitting(false);
      resetForm(false);
    }
  })
)(sendMessage);
