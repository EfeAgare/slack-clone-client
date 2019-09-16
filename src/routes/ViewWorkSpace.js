import React from 'react';
import { graphql } from 'react-apollo';
import allWorkSpaceQuery from '../graphql/query/allWorkSpace';
import Messages from '../components/Messages';
import AppLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import Header from '../components/Header';
import SideBar from '../containers/SideBar';
import sortBy from 'lodash/sortBy';

const ViewWorkSpace = ({
  data: { loading, allWorkSpace },
  match: {
    params: { id, channelId }
  }
}) => {
  if (loading) {
    return <p> Loading ...</p>;
  }

  const workSpace = allWorkSpace.find(
    workSpace => workSpace.id === parseInt(id, 10)
  );
  const channelIndex = !!channelId
    ? workSpace.channels.indexOf(
      sortBy(workSpace.channels, 'name').find(
          channel => channel.id === parseInt(channelId, 10)
        )
      )
    : 1;
  const channel = workSpace.channels[channelIndex];
  return (
    <AppLayout>
      <SideBar
        allWorkSpace={allWorkSpace.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase()
        }))}
        workSpace={workSpace}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};
export default graphql(allWorkSpaceQuery)(ViewWorkSpace);
