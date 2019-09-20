import React from 'react';
import { graphql } from 'react-apollo';
import allWorkSpaceQuery from '../graphql/query/allWorkSpace';

import AppLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import Header from '../components/Header';
import SideBar from '../containers/SideBar';
import sortBy from 'lodash/sortBy';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import MessageContainer from '../containers/MessageContainer'

const ViewWorkSpace = ({
  data: { loading, allWorkSpace, allInvitedWorkSpace },
  match: {
    params: { id, channelId }
  }
}) => {
  if (loading) {
    return <p> Loading ...</p>;
  }


  
  const workSpaces = [...allWorkSpace, ...allInvitedWorkSpace]

  if (!workSpaces.length) {
    return <Redirect to="/create-workspace" />;
  }

  const workSpaceInteger = parseInt(id, 10);
  const workSpaceIndex = workSpaceInteger
    ? workSpaces.indexOf(
        workSpaces.find(workSpace => workSpace.id === workSpaceInteger)
      )
    : 0;

  const workSpace =
    workSpaceIndex === -1 ? workSpaces[0] : workSpaces[workSpaceIndex];

  const channelIdInteger = parseInt(channelId, 10);
  const channelIndex = channelIdInteger
    ? workSpace.channels.indexOf(
        sortBy(workSpace.channels, 'name').find(
          channel => channel.id === channelIdInteger
        )
      )
    : 0;
  const channel =
    channelIndex === -1
      ? workSpace.channels[0]
      : workSpace.channels[channelIndex];

      const token = localStorage.getItem('token');
      const { user } = jwt.decode(token);
  return (
    <AppLayout>
      <SideBar
        allWorkSpace={workSpaces.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        workSpace={workSpace}
        user={user}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && (
        <MessageContainer channelId={channel.id}/>
        
      )}
      {channel && <SendMessage channelName={channel.name} channelId={channel.id} userId={user.id}/>}
    </AppLayout>
  );
};
export default graphql(allWorkSpaceQuery)(ViewWorkSpace);
