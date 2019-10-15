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
  margin-top: 10px !important;
  margin-bottom: unset !important;
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
  display: flex;
  margin-right: 20px;
  justify-content: space-between;
`;

const PushLeft = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;

// &#8226; unicode character
const Bubble = ({ on = true }) => (on ? <Green>&#8226;</Green> : '○');

const channel = ({ id, name, public: Public }, workSpaceId) =>
  // if(public === t)
  Public ? (
    <Link key={`channel-${id}`} to={`/view-workspace/${workSpaceId}/${id}`}>
      <SideBarListItem># {name}</SideBarListItem>
    </Link>
  ) : (
    <Link key={`channel-${id}`} to={`/view-workspace/${workSpaceId}/${id}`}>
      <SideBarListItem>
        <Icon name="lock" />
        {name}
      </SideBarListItem>
    </Link>
  );

  // <Link key={`channel-${id}`} to={`/view-workspace/${workSpaceId}/${id}`}>
  //   <SideBarListItem># {name}</SideBarListItem>
  // </Link>

const user = ({ id, username }, workSpaceId) => (
  <Link key={`user-${id}`} to={`/view-workspace/user/${workSpaceId}/${id}`}>
    <SideBarListItem>
      <Bubble /> {username}
    </SideBarListItem>
  </Link>
);

export default ({
  workSpaceName,
  username,
  channels,
  users,
  onAddChannelClick,
  workSpaceId,
  onAddUserModalClick,
  onWorkSpaceInviteClick
}) => (
  <ChannelWrapper>
    <PushLeft>
      <WorkSpaceNameHeader>{workSpaceName}</WorkSpaceNameHeader>
      <Bubble /> {username.charAt(0).toUpperCase() + username.slice(1)}
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
        <SideBarListHeader>
          Direct Messages{' '}
          <Icon onClick={onAddUserModalClick} name="plus circle" />
        </SideBarListHeader>
        {users
          .reduce((acc, element) => {
            if (element.username === username) {
              return [element, ...acc];
            }
            return [...acc, element];
          }, [])
          .map(u => user(u, workSpaceId))}
        {/* {users.reduce((acc, element) => {
  if (element.username === username) {
    return [element, ...acc];
  }
  return [...acc, element];
}, [])} */}
      </SideBarList>
    </div>
    <div>
      <a href="#invite-people" onClick={onWorkSpaceInviteClick}>
        + Invite people
      </a>
    </div>
  </ChannelWrapper>
);
