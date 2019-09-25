import React from 'react';
import { Button, Form, TextArea, Modal } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import { createWorkSpaceMemberMutation } from '../graphql/mutation/addWorkspaceMembers';
import normalizeError from '../utils/normalizeErrors';
import { modalHeight, modalContent, modalStyle } from '../styles/modalStyles';

const WorSpaceInviteModal = ({
  open,
  onClose,
  dimmer,
  workSpaceId,
  mutate
}) => (
  <Modal open={open} onClose={onClose} dimmer={dimmer} style={modalHeight}>
    <Modal.Header style={modalContent}>Request invitations</Modal.Header>
    <Modal.Content style={modalContent}>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const res = await mutate({
            variables: {
              workSpaceId: parseInt(workSpaceId, 10),
              email: values.name,
              url: `${window.location.host}`
            }
          });
          const { ok, errors } = res.data.createWorkSpaceMembers;
          setSubmitting(false);
          if (ok) {
            onClose();
          } else {
            setErrors(normalizeError(errors));
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <Form>
            <Form.Field>
              <Modal.Description>
                <p>
                  Fill in the email address of the people you’d like to invite.
                </p>
              </Modal.Description>
            </Form.Field>
            <Form.Field>
              <label>Emails</label>
              <TextArea
                placeholder="efe@knowledge.com, love@example.com "
                name="name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </Form.Field>
            <Form.Field>
              <Modal.Description>
                <p>
                  {' '}
                  Tip: Copy and paste a list of contacts from your email. Please
                  separate multiple addresses with commas!
                </p>
              </Modal.Description>
            </Form.Field>
            <Form.Field>
              <Modal.Description>
                <h4>Default Channels</h4>
                <div style={modalStyle}>
                  <p>
                    New members will automatically join #general and #random
                    channels
                  </p>
                </div>
              </Modal.Description>
            </Form.Field>
            <Form.Field>
              <Button
                negative
                disabled={isSubmitting}
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit}
                type="submit"
              >
                Add Invitees
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </Modal.Content>
  </Modal>
);

// console.log(document.getElements('textarea'))
// const tx = document.getElementsByTagName('textarea');
// for (let i = 0; i < tx.length; i++) {
//   tx[i].setAttribute(
//     'style',
//     'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;'
//   );
//   tx[i].addEventListener('input', OnInput, false);
// }

// function OnInput() {
//   this.style.height = 'auto';
//   this.style.height = this.scrollHeight + 'px';
// }

export default graphql(createWorkSpaceMemberMutation, {
  // options: {
  //   fetchPolicy: 'network-only'
  // }
})(WorSpaceInviteModal);
