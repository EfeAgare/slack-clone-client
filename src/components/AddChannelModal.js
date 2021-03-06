import React from 'react';
import { Button, Form, Input, Modal, Checkbox } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import { createChannelMutation } from '../graphql/mutation/createChannel';
import allWorkSpaceQuery from '../graphql/query/allWorkSpace';
import { modalStyle, modalHeight, modalContent } from '../styles/modalStyles';

const ChannelModal = ({ open, onClose, dimmer, workSpaceId, mutate }) => (
  <Modal open={open} onClose={onClose} dimmer={dimmer} style={modalHeight}>
    <Modal.Header style={modalContent}>Create a channel</Modal.Header>
    <Modal.Content style={modalContent}>
      <Formik
        initialValues={{ public: true, name: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          await mutate({
            variables: {
              workSpaceId: parseInt(workSpaceId, 10),
              name: values.name,
              public: values.public
            },
            update: (store, { data: { createChannel } }) => {
              // Read the data from our cache for this query.
              const { ok, channel } = createChannel;
              if (!ok) {
                return;
              }
              const data = store.readQuery({ query: allWorkSpaceQuery });
              // Add our channel from the mutation to the end.
              data.allWorkSpace
                .find(workSpace => workSpace.id === workSpaceId)
                .channels.push(channel);
              // Write our data back to the cache.
              store.writeQuery({ query: allWorkSpaceQuery, data });
            }
          });
          onClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
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
                  <Checkbox
                    toggle
                    onChange={(e, { checked }) =>
                      setFieldValue('public', !checked)
                    }
                  />
                </div>
                {values.public ? 'yea' : 'true'}
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
