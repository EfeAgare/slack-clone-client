import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import GetAllWorkSpaceMember from '../graphql/query/getAllWorkSpaceMembers';
import Downshift from 'downshift';
import { modalHeight, modalContent, autocomplete } from '../styles/modalStyles';
import { withRouter } from 'react-router-dom';

const AddUserModal = ({
  open,
  onClose,
  dimmer,
  workSpaceId,
  history,
  data: { loading, getAllWorkSpaceMember }
}) => (
  <Modal open={open} onClose={onClose} dimmer={dimmer} style={modalHeight}>
    <Modal.Header style={modalContent}>Direct Messages</Modal.Header>
    <Modal.Content style={modalContent}>
      <Form>
        {!loading && (
          <Downshift
            onChange={selection => {
              history.push(
                `/view-workspace/user/${workSpaceId}/${selection.id}`
              );
              onClose();
            }}
            itemToString={item => (item ? item.username : '')}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              itemToString,
              highlightedIndex,
              selectedItem
            }) => (
              <div>
                <label {...getLabelProps()}>Recent conversations</label>
                <div style={autocomplete}>
                  <input
                    {...getInputProps({
                      placeholder: 'Find or start a conversation',
                      // ItemToString:
                      
                      // onKeyDown: event => {
                      //   console.log(event.value);
                      

                      // if (event.key === 'Enter') {
                      //   history.push(`/view-workspace/user/${workSpaceId}`);
                      //   onClose();
                      // }
                      // }
                    })}
                  />
                  <Button negative onClick={onClose} type="button">
                    Cancel
                  </Button>
                </div>
                <ul
                  {...getMenuProps()}
                  style={{ listStyleType: 'none', padding: '10px' }}
                >
                  {isOpen
                    ? getAllWorkSpaceMember
                        .filter(
                          item =>
                            !inputValue ||
                            item.username
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <li
                            {...getItemProps({
                              key: item.id,
                              index,
                              item,
                              style: {
                                padding: '10px',

                                borderTop: '1px solid grey',
                                backgroundColor:
                                  highlightedIndex === index ? 'snow' : 'white',
                                fontWeight:
                                  selectedItem === item ? 'bold' : 'normal'
                              }
                            })}
                          >
                            {item.username.charAt(0).toUpperCase() +
                              item.username.slice(1)}
                          </li>
                        ))
                    : getAllWorkSpaceMember
                        .filter(
                          item =>
                            !inputValue ||
                            item.username
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <li
                            {...getItemProps({
                              key: item.id,
                              index,
                              item,
                              style: {
                                padding: '10px',

                                borderTop: '1px solid grey',
                                backgroundColor:
                                  highlightedIndex === index ? 'snow' : 'white',
                                fontWeight:
                                  selectedItem === item ? 'bold' : 'normal'
                              }
                            })}
                          >
                            {item.username.charAt(0).toUpperCase() +
                              item.username.slice(1)}
                          </li>
                        ))}
                </ul>
              </div>
            )}
          </Downshift>
        )}
      </Form>
    </Modal.Content>
  </Modal>
);

export default withRouter(graphql(GetAllWorkSpaceMember)(AddUserModal));
