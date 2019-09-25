import React from 'react';
import { graphql, compose } from 'react-apollo';
import allWorkSpaceQuery from '../graphql/query/allWorkSpace';

import AppLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import MessagePageHeader from '../components/MessagePageHeader';
import SideBar from '../containers/SideBar';
// import sortBy from 'lodash/sortBy';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import DirectMessageContainer from '../containers/DirectMessageContainer';
import { createDirectMessageMutation } from '../graphql/mutation/createDirectMessage';

const DirectMessage = ({
  mutate,
  data: { loading, allWorkSpace, allInvitedWorkSpace },
  match: {
    params: { workSpaceId, channelId, receiverId }
  }
}) => {
  if (loading) {
    return <p> Loading ...</p>;
  }

  const workSpaces = [...allWorkSpace, ...allInvitedWorkSpace];

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

  // const channelIdInteger = parseInt(channelId, 10);
  // const channelIndex = channelIdInteger
  //   ? workSpace.channels.indexOf(
  //       sortBy(workSpace.channels, 'name').find(
  //         channel => channel.id === channelIdInteger
  //       )
  //     )
  //   : 0;
  // const channel =
  //   channelIndex === -1
  //     ? workSpace.channels[0]
  //     : workSpace.channels[channelIndex];

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
      <MessagePageHeader name={receiverId} />
      <DirectMessageContainer workSpaceId={workSpace.id} receiverId={receiverId} />

      <SendMessage
        onSubmit={async text => {
          console.log(receiverId, workSpaceId);
          const res = await mutate({
            variables: {
              receiverId: parseInt(receiverId, 10),
              text: text,
              workSpaceId: parseInt(workSpaceId, 10)
            }
          });
          console.log(res);
        }}
        name={receiverId}
      />
    </AppLayout>
  );
};
export default compose(
  graphql(allWorkSpaceQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(createDirectMessageMutation)
)(DirectMessage);
