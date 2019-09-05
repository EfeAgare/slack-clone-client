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
      owner
    }
  }
`;

const SideBar = ({ data: { loading, allWorkSpace }, currentTeamId }) => {
  if (loading) {
    return <p> Loading ...</p>;
  }

  const teamIndex = _.findIndex(allWorkSpace, {'owner': currentTeamId});
  const team = allWorkSpace[teamIndex];
  console.log(allWorkSpace.map(t => ({
    id: t.id,
    letter: t.name.charAt(0).toUpperCase()
  })))
  let username;
  try {
    const token = localStorage.getItem('token');
    const { user } = jwt.decode(token);
    username = user.username;
  } catch (error) {}
  return [
    <WorkSpace
      key="team-sidebar"
      allWorkSpaces={allWorkSpace.map(t => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase()
      }))}
    />,
    <Channels
      key="channel-sidebar"
      teamName={team.name}
      username={username}
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      // channels={team.channels}
      users={[{ id: 1, name: 'efe' }, { id: 2, name: 'knowledge' }]}
    >
      Channels
    </Channels>
  ];
};

export default graphql(allWorkSpaceQuery)(SideBar);
