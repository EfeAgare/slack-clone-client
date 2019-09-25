import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { createMessageMutation } from '../graphql/mutation/createMessageMutation';
import { graphql, compose } from 'react-apollo';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 4;
  margin: 20px;
`;

const ENTER_KEY = 13;
const sendMessage = ({
  name,
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <SendMessageWrapper>
    <Input
      fluid
      placeholder={ name ? `Message  ${name}`: `Message  #${channelName}` }
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
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),

    handleSubmit: async (
      values,
      { setSubmitting, resetForm, props: { onSubmit }  }
    ) => {
      if (!values.message && !values.message.trim()) {
        setSubmitting(false);
        return;
      }
      await onSubmit(values.message);
      setSubmitting(false);
      resetForm(false)
    }
  })
)(sendMessage);
