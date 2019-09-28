import React, { Component, Fragment } from 'react';
import WorkSpace from '../components/WorkSpace';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';
import WorSpaceInviteModal from '../components/WorSpaceInviteModal';
import AddUserModal from '../components/AddUserModal';
import sortBy from 'lodash/sortBy';

class SideBar extends Component {
  state = {
    openAddNewChannelModal: false,
    openWorSpaceInviteModal: false,
    openAddUserModal: false
  };

  handleAddChannelClick = dimmer =>
    this.setState({ dimmer, openAddNewChannelModal: true });

  handleCloseChannelClick = () =>
    this.setState({ openAddNewChannelModal: false });

  handleWorkSpaceInviteClick = dimmer =>
    this.setState({ dimmer, openWorSpaceInviteModal: true });

  handleCloseWorkSpaceInviteModal = () =>
    this.setState({ openWorSpaceInviteModal: false });

  handleAddUserClick = dimmer =>
    this.setState({ dimmer, openAddUserModal: true });

  handleCloseAddUserModal = () => this.setState({ openAddUserModal: false });
  render() {
    const { allWorkSpace, workSpace, user } = this.props;

    const {
      openAddNewChannelModal,
      openWorSpaceInviteModal,
      openAddUserModal
    } = this.state;

    return (
      <Fragment>
        <WorkSpace key="workSpace-sidebar" allWorkSpaces={allWorkSpace} />
        <Channels
          key="channel-sidebar"
          workSpaceName={workSpace.name}
          workSpaceId={workSpace.id}
          username={user.username}
          channels={sortBy(workSpace.channels, 'name')}
          onAddChannelClick={this.handleAddChannelClick}
          onWorkSpaceInviteClick={this.handleWorkSpaceInviteClick}
          onAddUserModalClick={this.handleAddUserClick}
          users={workSpace.directMessageMembers}
        >
          Channels
        </Channels>
        <AddChannelModal
          onClose={this.handleCloseChannelClick}
          workSpaceId={workSpace.id}
          open={openAddNewChannelModal}
          dimmer="inverted"
          key="sidebar-add-channel-modal"
        />
        <WorSpaceInviteModal
          onClose={this.handleCloseWorkSpaceInviteModal}
          workSpaceId={workSpace.id}
          open={openWorSpaceInviteModal}
          dimmer="inverted"
          key="invite-member-modal"
        />
        <AddUserModal
          onClose={this.handleCloseAddUserModal}
          open={openAddUserModal}
          workSpaceId={workSpace.id}
          dimmer="inverted"
          key="add-user-modal"
        />
      </Fragment>
    );
  }
}

export default SideBar;
