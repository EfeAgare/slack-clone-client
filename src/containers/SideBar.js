import React, { Component, Fragment } from 'react';
import jwt from 'jsonwebtoken';
import { graphql } from 'react-apollo';
import WorkSpace from '../components/WorkSpace';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';
import sortBy from 'lodash/sortBy';

import allWorkSpaceQuery from '../graphql/query/allWorkSpace';

class SideBar extends Component {
  state = {
    openAddNewChannelModal: false
  };

  handleAddChannelClick = (dimmer) => this.setState({ dimmer, openAddNewChannelModal: true });
  handleCloseChannelClick = () => this.setState({ openAddNewChannelModal: false });
  render() {
    const {
      data: { loading, allWorkSpace },
      currentWorkSpaceId
    } = this.props;
    if (loading) {
      return <p> Loading ...</p>;
    }

    
    const workSpace = allWorkSpace.find(workSpace => workSpace.id === parseInt(currentWorkSpaceId, 10) )
 
    let username;
    try {
      const token = localStorage.getItem('token');
      const { user } = jwt.decode(token);
      username = user.username;
    } catch (error) {}
    return (
      <Fragment>
        <WorkSpace
          key="workSpace-sidebar"
          allWorkSpaces={allWorkSpace.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase()
          }))}
        />
        ,
        <Channels
          key="channel-sidebar"
          workSpaceName={workSpace.name}
          workSpaceId={workSpace.id}
          username={username}
          channels={sortBy(workSpace.channels, "name")}
          onAddChannelClick={this.handleAddChannelClick}
          users={[{ id: 1, name: 'efe' }, { id: 2, name: 'knowledge' }]}
        >
          Channels
        </Channels>
        <AddChannelModal
          onClose={this.handleCloseChannelClick}
          workSpaceId={workSpace.id}
          open={this.state.openAddNewChannelModal}
          dimmer="inverted"
          key="sidebar-add-channel-modal"
        />

      </Fragment>
    );
  }
}

export default graphql(allWorkSpaceQuery)(SideBar);
