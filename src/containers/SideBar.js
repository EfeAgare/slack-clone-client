import React from 'react';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import  gql  from 'graphql-tag';
import { graphql } from 'react-apollo';
import WorkSpace from '../components/WorkSpace';
import Channels from '../components/Channels';


const allWorkSpaceQuery = gql`
  {
    allWorkSpace {
      id
      name
      userId
      channels{
        id
        name
      }
    }
  }
`;

const SideBar = ({ data: { loading, allWorkSpace }, currentTeamId }) => {
  if (loading) {
    return <p> Loading ...</p>;
  }

  const workSpaceIndex = _.findIndex(allWorkSpace, {'userId':currentTeamId});
  const workSpace = allWorkSpace[workSpaceIndex];
  let username;
  try {
    const token = localStorage.getItem('token');
    const { user } = jwt.decode(token);
    username = user.username;
  } catch (error) {}
  return [
    <WorkSpace
      key="workSpace-sidebar"
      allWorkSpaces={allWorkSpace.map(t => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase()
      }))}
    />,
    <Channels
      key="channel-sidebar"
      workSpaceName={workSpace.name}
      username={username}
      channels={workSpace.channels}
      users={[{ id: 1, name: 'efe' }, { id: 2, name: 'knowledge' }]}
    >
      Channels
    </Channels>
  ];
};

export default graphql(allWorkSpaceQuery)(SideBar);
