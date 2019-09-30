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
import directMessageMe from '../graphql/query/directMessageMe';

const DirectMessage = ({
  mutate,
  data: { loading, allWorkSpace, getUser },
  match: {
    params: { workSpaceId, channelId, receiverId }
  }
}) => {
  if (loading) {
    return <p> Loading ...</p>;
  }

  const workSpaces = allWorkSpace;
  const token = localStorage.getItem('token');

  if (!token) {
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
      <MessagePageHeader name={getUser.username} />
      <DirectMessageContainer
        workSpaceId={workSpace.id}
        receiverId={receiverId}
      />

      <SendMessage
        onSubmit={async text => {
          await mutate({
            variables: {
              receiverId: parseInt(receiverId, 10),
              text: text,
              workSpaceId: parseInt(workSpaceId, 10)
            },
            update: store => {
              // Read the data from our cache for this query.

              const data = store.readQuery({ query: allWorkSpaceQuery });
              // Add our channel from the mutation to the end.
              // console.log(data.allWorkSpace)
              // console.log(workSpaceId)
              // console.log(data.allWorkSpace.find(workSpace => console.log(workSpace.id)))
              // console.log(data.allWorkSpace.find(workSpace => workSpace.id === parseInt(workSpaceId)))
              const notAlreadyPresent = data.allWorkSpace
                .find(workSpace => workSpace.id === parseInt(workSpaceId))
                .directMessageMembers.every(
                  member => member.id !== parseInt(receiverId, 10)
                );
              if (notAlreadyPresent) {
                data.allWorkSpace
                  .find(workSpace => workSpace.id === workSpaceId)
                  .directMessageMembers.push({
                    _typename: 'User',
                    id: parseInt(receiverId, 10),
                    username: getUser.username
                  });
                // Write our data back to the cache.
                store.writeQuery({ query: allWorkSpaceQuery, data });
              }
            }
          });
        }}
        name={getUser.username}
      />
    </AppLayout>
  );
};
export default compose(
  graphql(directMessageMe, {
    options: props => ({
      variables: { userId: parseInt(props.match.params.receiverId, 10) },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(createDirectMessageMutation)
)(DirectMessage);
