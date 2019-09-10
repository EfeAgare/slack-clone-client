import React from 'react';
import { Button, Form, Input, Modal, Checkbox } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import { createChannelMutation } from '../graphql/mutation/createChannel';
import allWorkSpaceQuery from '../graphql/query/allWorkSpace';

const modalStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const ChannelModal = ({ open, onClose, dimmer, workSpaceId, mutate }) => (
  <Modal open={open} onClose={onClose} dimmer={dimmer}>
    <Modal.Header>Create a channel</Modal.Header>
    <Modal.Content>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async (values, { setSubmitting }) =>
          {
            setSubmitting(false);
            await mutate({
              variables: {
                workSpaceId: parseInt(workSpaceId, 10),
                name: values.name
              },
              update: (store, { data: { allWorkSpace} }) => {
                // Read the data from our cache for this query.
                const data = store.readQuery({ query: allWorkSpaceQuery });
                // Add our comment from the mutation to the end.
                data.channels.push(allWorkSpace);
                // Write our data back to the cache.
                store.writeQuery({ query: allWorkSpaceQuery, data });
              }
            });
            onClose();
          }
        }
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
                <p>Channels are where your members communicate.</p>
                <p>
                  They’re best when organized around a topic — #team-marketing
                  or #proj-budget, for example.
                </p>
                <p>
                  Learn more about how to create and name channels for your
                  team.
                </p>
              </Modal.Description>
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <Input
                fluid
                placeholder="# e.g efe-knowledge"
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
                <h4>Make private</h4>
                <div style={modalStyle}>
                  <p>
                    Make private When a channel is set to private, it can only
                    be viewed or joined by invitation.
                  </p>
                  <Checkbox toggle />
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
                Create
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </Modal.Content>
  </Modal>
);

export default graphql(createChannelMutation)(ChannelModal);
