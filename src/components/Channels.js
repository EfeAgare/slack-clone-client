import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 5;
  background-color: #4e3a4c;
  color: #958993;
`;

const WorkSpaceNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
  :first-child {
    &:hover {
      color: #ffff;
    }
   
  }
    a {
      text-decoration: none;
      color: #958993;

  }
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`
  ${paddingLeft};
`;

const PushLeft = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;

// &#8226; unicode character
const Bubble = ({ on = true }) => (on ? <Green>&#8226;</Green> : '○');

const channel = ({ id, name }, workSpaceId) => (
  <Link key={`channel-${id}`} to={`/view-workspace/${workSpaceId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

export default ({
  workSpaceName,
  username,
  channels,
  users,
  onAddChannelClick,
  workSpaceId
}) => (
  <ChannelWrapper>
    <PushLeft>
      <WorkSpaceNameHeader>{workSpaceName}</WorkSpaceNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels <Icon onClick={onAddChannelClick} name="plus circle" />
        </SideBarListHeader>
        {channels.map(c => channel(c, workSpaceId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
);
