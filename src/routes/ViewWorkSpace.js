import React from 'react';
import { graphql, compose } from 'react-apollo';
import allWorkSpaceQuery from '../graphql/query/allWorkSpace';

import AppLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import MessagePageHeader from '../components/MessagePageHeader';
import SideBar from '../containers/SideBar';
import sortBy from 'lodash/sortBy';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { createMessageMutation } from '../graphql/mutation/createMessageMutation';

import MessageContainer from '../containers/MessageContainer';

const ViewWorkSpace = ({
  mutate,
  data: { loading, allWorkSpace },
  match: {
    params: { workSpaceId, channelId }
  }
}) => {
  if (loading) {
    return <p> Loading ...</p>;
  }

  const workSpaces = allWorkSpace;
  const token = localStorage.getItem('token');

  if(!token){
    return <Redirect to="/login" />;
  }
  if (!workSpaces.length) {
    return <Redirect to="/create-workspace" />;
  }

  const workSpaceInteger = parseInt(workSpaceId, 10);
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
      {channel && <MessagePageHeader channelName={channel.name} public={channel.public}/>}
      {channel && <MessageContainer channelId={channel.id} />}
      {channel && (
        <SendMessage
          channelName={channel.name}
          onSubmit={async text => {
            await mutate({ variables: { text, channelId: channel.id } });
          }}
          channelId={channel.id}
        />
      )}
    </AppLayout>
  );
};
export default compose(
  graphql(allWorkSpaceQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(createMessageMutation)
)(ViewWorkSpace);
